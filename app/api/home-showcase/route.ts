import { getCatalogAdmin, unauthorizedAdminResponse } from "../../admin-auth";
import type { HomeShowcaseCard } from "../../lib/types";
import { removeProductImage, saveProductImage, updateHomeShowcase } from "../../../db/products";
import { updateHeroProducts } from "../../../db/hero-products";

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
const UPLOAD_PREFIX = "/api/product-images/";

function field(form: FormData, key: string, max = 300) {
  return String(form.get(key) ?? "").trim().slice(0, max);
}

/** Internal paths ("/bearing", "/products?category=Pumps") or full http(s) links. */
function cleanLink(value: string) {
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function uploadedImage(form: FormData, key: string): File | null | "invalid" {
  const file = form.get(key);
  if (!(file instanceof File) || file.size === 0) return null;
  if (!IMAGE_TYPES.includes(file.type) || file.size > 8_000_000) return "invalid";
  return file;
}

async function removeIfUploaded(path: string | undefined) {
  if (path?.startsWith(UPLOAD_PREFIX)) await removeProductImage(path.slice(UPLOAD_PREFIX.length));
}

function back(request: Request, message: string) {
  const url = new URL("/manage/homepage", request.url);
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

  const image = uploadedImage(form, "image");
  if (image === "invalid") return bad("Image must be PNG, JPEG or WebP and under 8 MB.");

  if (action === "feature") {
    const title = field(form, "title", 120);
    const text = field(form, "text", 600);
    const buttonLabel = field(form, "buttonLabel", 40) || "View more";
    const href = cleanLink(field(form, "href", 500));
    if (!title || !href) return bad("Title and a valid link are required.");
    const newImage = image ? `${UPLOAD_PREFIX}${await saveProductImage(image)}` : null;
    let replaced: string | undefined;
    await updateHomeShowcase((current) => {
      if (newImage) replaced = current.feature.imagePath;
      current.feature = {
        title,
        text,
        buttonLabel,
        href,
        imagePath: newImage ?? current.feature.imagePath,
      };
      return current;
    });
    await removeIfUploaded(replaced);
    return back(request, "feature");
  }

  // Card actions work on the homepage cards or on the products around the logo in the hero.
  const list = field(form, "list") === "hero" ? "hero" : "cards";
  const updateList = (update: (cards: HomeShowcaseCard[]) => HomeShowcaseCard[]) =>
    list === "hero"
      ? updateHeroProducts(update)
      : updateHomeShowcase((current) => ({ ...current, cards: update(current.cards) }));
  const done = (message: string) => back(request, list === "hero" ? `hero-${message}` : message);

  if (action === "add-card") {
    const title = field(form, "title", 80);
    const href = cleanLink(field(form, "href", 500));
    if (!title || !href) return bad("Title and a valid link are required.");
    if (!image) return bad("Please choose an image for the new card.");
    const imagePath = `${UPLOAD_PREFIX}${await saveProductImage(image)}`;
    await updateList((cards) => {
      const position = Number(field(form, "position"));
      const card = { id: crypto.randomUUID().slice(0, 8), title, href, imagePath };
      const index = position >= 1 ? Math.min(position - 1, cards.length) : cards.length;
      cards.splice(index, 0, card);
      return cards;
    });
    return done("added");
  }

  const id = field(form, "id", 60);
  if (!id) return bad("Missing card.");

  if (action === "update-card") {
    const title = field(form, "title", 80);
    const href = cleanLink(field(form, "href", 500));
    if (!title || !href) return bad("Title and a valid link are required.");
    const newImage = image ? `${UPLOAD_PREFIX}${await saveProductImage(image)}` : null;
    let replaced: string | undefined;
    let found = false;
    await updateList((cards) => {
      const card = cards.find((item) => item.id === id);
      if (!card) return cards;
      found = true;
      if (newImage) {
        replaced = card.imagePath;
        card.imagePath = newImage;
      }
      card.title = title;
      card.href = href;
      return cards;
    });
    if (!found) {
      await removeIfUploaded(newImage ?? undefined);
      return bad("Card not found.");
    }
    await removeIfUploaded(replaced);
    return done("card");
  }

  if (action === "move-up" || action === "move-down") {
    await updateList((cards) => moveCard(cards, id, action === "move-up" ? -1 : 1));
    return done("order");
  }

  if (action === "delete-card") {
    let removed: string | undefined;
    await updateList((cards) => {
      removed = cards.find((item) => item.id === id)?.imagePath;
      return cards.filter((item) => item.id !== id);
    });
    await removeIfUploaded(removed);
    return done("deleted");
  }

  return bad("Unknown action.");
}

function moveCard(cards: HomeShowcaseCard[], id: string, step: number): HomeShowcaseCard[] {
  const from = cards.findIndex((item) => item.id === id);
  const to = from + step;
  if (from < 0 || to < 0 || to >= cards.length) return cards;
  const [card] = cards.splice(from, 1);
  cards.splice(to, 0, card);
  return cards;
}
