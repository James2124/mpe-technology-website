import { getCatalogAdmin, unauthorizedAdminResponse } from "../../admin-auth";
import { removeProductImage, saveProductImage } from "../../../db/products";
import { findPhotoPage, updatePagePhotoGroups } from "../../../db/page-photos";

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
const UPLOAD_PREFIX = "/api/product-images/";
const MAX_FILES_PER_UPLOAD = 20;

function field(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function back(request: Request, page: string, message: string) {
  const url = new URL("/manage/photos", request.url);
  url.searchParams.set("page", page);
  url.searchParams.set("saved", message);
  return Response.redirect(url, 303);
}

function bad(message: string) {
  return new Response(message, { status: 400 });
}

export async function POST(request: Request) {
  if (!(await getCatalogAdmin())) return unauthorizedAdminResponse();
  const form = await request.formData();
  const action = field(form, "action");
  const page = field(form, "page");
  const groupIndex = Number(field(form, "group"));

  const photoPage = findPhotoPage(page);
  if (!photoPage) return bad("Unknown page.");
  if (!Number.isInteger(groupIndex) || groupIndex < 0) return bad("Unknown photo group.");

  if (action === "add") {
    const files = form.getAll("photos").filter((file): file is File => file instanceof File && file.size > 0);
    if (files.length === 0) return bad("Please choose at least one photo.");
    if (files.length > MAX_FILES_PER_UPLOAD) return bad(`Upload at most ${MAX_FILES_PER_UPLOAD} photos at a time.`);
    if (files.some((file) => !IMAGE_TYPES.includes(file.type) || file.size > 8_000_000)) {
      return bad("Photos must be PNG, JPEG or WebP and under 8 MB each.");
    }
    const paths: string[] = [];
    for (const file of files) paths.push(`${UPLOAD_PREFIX}${await saveProductImage(file)}`);
    let added = false;
    await updatePagePhotoGroups(page, (groups) => {
      if (!groups[groupIndex]) return groups;
      const where = field(form, "where");
      groups[groupIndex].photos = where === "start"
        ? [...paths, ...groups[groupIndex].photos]
        : [...groups[groupIndex].photos, ...paths];
      added = true;
      return groups;
    });
    if (!added) {
      await Promise.all(paths.map((path) => removeProductImage(path.slice(UPLOAD_PREFIX.length))));
      return bad("Unknown photo group.");
    }
    return back(request, page, "added");
  }

  const photo = field(form, "photo");
  if (!photo) return bad("Missing photo.");

  if (action === "delete") {
    let removed = false;
    await updatePagePhotoGroups(page, (groups) => {
      const group = groups[groupIndex];
      if (!group?.photos.includes(photo)) return groups;
      group.photos = group.photos.filter((item) => item !== photo);
      removed = true;
      return groups;
    });
    // Uploaded photos are deleted from storage; built-in photos stay in the site files.
    if (removed && photo.startsWith(UPLOAD_PREFIX)) await removeProductImage(photo.slice(UPLOAD_PREFIX.length));
    return back(request, page, "deleted");
  }

  if (action === "move-earlier" || action === "move-later") {
    await updatePagePhotoGroups(page, (groups) => {
      const photos = groups[groupIndex]?.photos;
      if (!photos) return groups;
      const from = photos.indexOf(photo);
      const to = from + (action === "move-earlier" ? -1 : 1);
      if (from < 0 || to < 0 || to >= photos.length) return groups;
      [photos[from], photos[to]] = [photos[to], photos[from]];
      return groups;
    });
    return back(request, page, "order");
  }

  return bad("Unknown action.");
}
