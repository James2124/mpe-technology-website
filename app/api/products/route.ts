import { getCatalogAdmin, unauthorizedAdminResponse } from "../../admin-auth";
import { createProduct, saveProductImage } from "../../../db/products";

function field(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function lines(value: string) {
  return value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean).slice(0, 12);
}

function specs(value: string) {
  return Object.fromEntries(
    lines(value)
      .map((line) => {
        const separator = line.indexOf(":");
        return separator > 0 ? [line.slice(0, separator).trim(), line.slice(separator + 1).trim()] : null;
      })
      .filter((item): item is [string, string] => Boolean(item?.[0] && item?.[1])),
  );
}

export async function POST(request: Request) {
  if (!(await getCatalogAdmin())) return unauthorizedAdminResponse();
  const form = await request.formData();
  const name = field(form, "name");
  const category = field(form, "category");
  const subtitle = field(form, "subtitle");
  const description = field(form, "description");
  if (!name || !category || !subtitle || !description) return new Response("Missing required fields", { status: 400 });

  let imagePath: string | null = null;
  const image = form.get("image");
  if (image instanceof File && image.size > 0) {
    if (!["image/png", "image/jpeg", "image/webp"].includes(image.type) || image.size > 8_000_000) {
      return new Response("Image must be PNG, JPEG or WebP and under 8 MB.", { status: 400 });
    }
    const key = await saveProductImage(image);
    imagePath = `/api/product-images/${key}`;
  }

  const slug = await createProduct({
    name: name.slice(0, 180),
    category: category.slice(0, 80),
    subtitle: subtitle.slice(0, 220),
    description: description.slice(0, 4000),
    features: lines(field(form, "features")),
    specs: specs(field(form, "specs")),
    imagePath,
    externalUrl: field(form, "externalUrl").slice(0, 1000) || null,
    featured: form.get("featured") === "1",
  });
  return Response.redirect(new URL(`/products/${slug}`, request.url), 303);
}
