import { access, mkdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Enquiry, Product } from "../app/lib/types";
import type { CreateEnquiryInput, CreateProductInput, StoredProductImage } from "./product-store-types";
import { starterProducts } from "./starter-products";

type CatalogData = {
  version: 1;
  products: Product[];
  enquiries: Enquiry[];
};

let ready: Promise<void> | null = null;
let writeQueue: Promise<unknown> = Promise.resolve();

function storageDirectory() {
  return path.resolve(process.env.MPE_STORAGE_DIR?.trim() || path.join(process.cwd(), "storage"));
}

function catalogPath() {
  return path.join(storageDirectory(), "catalog.json");
}

function imageDirectory() {
  return path.join(storageDirectory(), "product-images");
}

export function ensureProductSchema() {
  ready ??= initializeStorage();
  return ready;
}

async function initializeStorage() {
  await mkdir(imageDirectory(), { recursive: true });
  try {
    await access(catalogPath());
  } catch {
    const createdAt = new Date().toISOString();
    await writeCatalog({
      version: 1,
      products: starterProducts.map((product, index) => ({
        ...product,
        id: index + 1,
        slug: slugify(product.name),
        createdAt,
      })),
      enquiries: [],
    });
  }
}

async function readCatalog(): Promise<CatalogData> {
  await ensureProductSchema();
  const value = JSON.parse(await readFile(catalogPath(), "utf8")) as Partial<CatalogData>;
  return {
    version: 1,
    products: Array.isArray(value.products) ? value.products : [],
    enquiries: Array.isArray(value.enquiries) ? value.enquiries : [],
  };
}

async function writeCatalog(data: CatalogData) {
  const target = catalogPath();
  const temporary = `${target}.${process.pid}.${crypto.randomUUID()}.tmp`;
  await writeFile(temporary, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  try {
    await rename(temporary, target);
  } catch (error) {
    await rm(temporary, { force: true });
    throw error;
  }
}

function updateCatalog<T>(update: (data: CatalogData) => Promise<T> | T): Promise<T> {
  const operation = writeQueue.then(async () => {
    const data = await readCatalog();
    const result = await update(data);
    await writeCatalog(data);
    return result;
  });
  writeQueue = operation.catch(() => undefined);
  return operation;
}

export async function listProducts(): Promise<Product[]> {
  const data = await readCatalog();
  return [...data.products].sort(
    (left, right) => Number(right.featured) - Number(left.featured)
      || right.createdAt.localeCompare(left.createdAt)
      || right.id - left.id,
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await readCatalog();
  return data.products.find((product) => product.slug === slug) ?? null;
}

export async function createProduct(input: CreateProductInput): Promise<string> {
  return updateCatalog((data) => {
    const base = slugify(input.slug || input.name);
    let slug = base;
    if (data.products.some((product) => product.slug === slug)) {
      slug = `${base}-${Date.now().toString(36)}`;
    }
    const id = data.products.reduce((highest, product) => Math.max(highest, product.id), 0) + 1;
    data.products.push({ ...input, id, slug, createdAt: new Date().toISOString() });
    return slug;
  });
}

export async function deleteProduct(id: number): Promise<Product | null> {
  return updateCatalog((data) => {
    const index = data.products.findIndex((product) => product.id === id);
    if (index < 0) return null;
    return data.products.splice(index, 1)[0] ?? null;
  });
}

export async function claimOrCheckAdmin(): Promise<boolean> {
  return true;
}

export async function createEnquiry(input: CreateEnquiryInput) {
  await updateCatalog((data) => {
    const id = data.enquiries.reduce((highest, enquiry) => Math.max(highest, enquiry.id), 0) + 1;
    data.enquiries.push({ ...input, id, createdAt: new Date().toISOString() });
  });
}

export async function listEnquiries(): Promise<Enquiry[]> {
  const data = await readCatalog();
  return [...data.enquiries]
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt) || right.id - left.id)
    .slice(0, 50);
}

export async function saveProductImage(image: File): Promise<string> {
  await ensureProductSchema();
  const extension = image.type === "image/png" ? "png" : image.type === "image/webp" ? "webp" : "jpg";
  const key = `${crypto.randomUUID()}.${extension}`;
  await writeFile(path.join(imageDirectory(), key), new Uint8Array(await image.arrayBuffer()));
  return key;
}

export async function readProductImage(key: string): Promise<StoredProductImage | null> {
  if (!isSafeImageKey(key)) return null;
  await ensureProductSchema();
  const target = path.join(imageDirectory(), key);
  try {
    const [body, metadata] = await Promise.all([readFile(target), stat(target)]);
    return {
      body: new Uint8Array(body),
      contentType: contentTypeFor(key),
      etag: `"${metadata.size}-${Math.trunc(metadata.mtimeMs)}"`,
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export async function removeProductImage(key: string): Promise<void> {
  if (!isSafeImageKey(key)) return;
  await rm(path.join(imageDirectory(), key), { force: true });
}

function isSafeImageKey(key: string) {
  return /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,199}$/.test(key);
}

function contentTypeFor(key: string) {
  if (key.endsWith(".png")) return "image/png";
  if (key.endsWith(".webp")) return "image/webp";
  if (key.endsWith(".jpg") || key.endsWith(".jpeg")) return "image/jpeg";
  return "application/octet-stream";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || `product-${Date.now().toString(36)}`;
}
