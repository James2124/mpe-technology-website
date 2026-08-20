import { env } from "cloudflare:workers";
import type { ChatGPTUser } from "../app/chatgpt-auth";
import type { Enquiry, Product } from "../app/lib/types";
import type { CreateEnquiryInput, CreateProductInput, UpdateProductInput, StoredProductImage } from "./product-store-types";
import { starterProducts } from "./starter-products";

type ProductRow = {
  id: number;
  slug: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  features: string;
  specs: string;
  image_path: string | null;
  external_url: string | null;
  featured: number;
  created_at: string;
};

type EnquiryRow = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  product_interest: string;
  message: string;
  created_at: string;
};

function getD1(): D1Database {
  const binding = (env as unknown as { DB?: D1Database }).DB;
  if (!binding) throw new Error("D1 binding DB is unavailable");
  return binding;
}

function getImageBucket(): R2Bucket {
  const bucket = (env as unknown as { PRODUCT_IMAGES?: R2Bucket }).PRODUCT_IMAGES;
  if (!bucket) throw new Error("R2 binding PRODUCT_IMAGES is unavailable");
  return bucket;
}

let schemaReady: Promise<void> | null = null;

export function ensureProductSchema() {
  schemaReady ??= initializeSchema();
  return schemaReady;
}

async function initializeSchema() {
  const db = getD1();
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      subtitle TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL,
      features TEXT NOT NULL DEFAULT '[]',
      specs TEXT NOT NULL DEFAULT '{}',
      image_path TEXT,
      external_url TEXT,
      featured INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_products_featured_created ON products(featured, created_at)"),
    db.prepare(`CREATE TABLE IF NOT EXISTS admin_users (
      user_id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      company TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      product_interest TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at)"),
  ]);

  const count = await db.prepare("SELECT COUNT(*) AS total FROM products").first<{ total: number }>();
  if (!count?.total) {
    await db.batch(
      starterProducts.map((product) =>
        db.prepare(`INSERT INTO products
          (slug, name, category, subtitle, description, features, specs, image_path, external_url, featured)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
          .bind(
            slugify(product.name),
            product.name,
            product.category,
            product.subtitle,
            product.description,
            JSON.stringify(product.features),
            JSON.stringify(product.specs),
            product.imagePath,
            product.externalUrl,
            product.featured ? 1 : 0,
          ),
      ),
    );
  }
  await db.prepare("PRAGMA optimize").run();
}

export async function listProducts(): Promise<Product[]> {
  await ensureProductSchema();
  const result = await getD1()
    .prepare("SELECT * FROM products ORDER BY featured DESC, created_at DESC, id DESC")
    .all<ProductRow>();
  return (result.results ?? []).map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await ensureProductSchema();
  const row = await getD1()
    .prepare("SELECT * FROM products WHERE slug = ? LIMIT 1")
    .bind(slug)
    .first<ProductRow>();
  return row ? mapProduct(row) : null;
}

export async function createProduct(input: CreateProductInput): Promise<string> {
  await ensureProductSchema();
  const base = slugify(input.slug || input.name);
  let slug = base;
  if (await getProductBySlug(slug)) slug = `${base}-${Date.now().toString(36)}`;
  await getD1()
    .prepare(`INSERT INTO products
      (slug, name, category, subtitle, description, features, specs, image_path, external_url, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(
      slug,
      input.name,
      input.category,
      input.subtitle,
      input.description,
      JSON.stringify(input.features),
      JSON.stringify(input.specs),
      input.imagePath,
      input.externalUrl,
      input.featured ? 1 : 0,
    )
    .run();
  return slug;
}

export async function updateProduct(
  id: number,
  input: UpdateProductInput
): Promise<Product | null> {
  await ensureProductSchema();

  const existing = await getD1()
    .prepare("SELECT * FROM products WHERE id = ? LIMIT 1")
    .bind(id)
    .first<ProductRow>();

  if (!existing) return null;

  await getD1()
    .prepare(`
      UPDATE products
      SET
        name = ?,
        category = ?,
        subtitle = ?,
        description = ?,
        features = ?,
        specs = ?,
        image_path = ?,
        external_url = ?,
        featured = ?
      WHERE id = ?
    `)
    .bind(
      input.name,
      input.category,
      input.subtitle,
      input.description,
      JSON.stringify(input.features),
      JSON.stringify(input.specs),
      input.imagePath,
      input.externalUrl,
      input.featured ? 1 : 0,
      id,
    )
    .run();

  const updated = await getD1()
    .prepare("SELECT * FROM products WHERE id = ? LIMIT 1")
    .bind(id)
    .first<ProductRow>();

  return updated ? mapProduct(updated) : null;
}

export async function deleteProduct(id: number): Promise<Product | null> {
  await ensureProductSchema();
  const row = await getD1().prepare("SELECT * FROM products WHERE id = ?").bind(id).first<ProductRow>();
  if (!row) return null;
  await getD1().prepare("DELETE FROM products WHERE id = ?").bind(id).run();
  return mapProduct(row);
}

export async function claimOrCheckAdmin(user: ChatGPTUser): Promise<boolean> {
  await ensureProductSchema();
  const db = getD1();
  const count = await db.prepare("SELECT COUNT(*) AS total FROM admin_users").first<{ total: number }>();
  if (!count?.total) {
    await db.prepare("INSERT OR IGNORE INTO admin_users (user_id, email) VALUES (?, ?)")
      .bind(user.userId, user.email)
      .run();
  }
  const admin = await db.prepare("SELECT user_id FROM admin_users WHERE user_id = ?")
    .bind(user.userId)
    .first();
  return Boolean(admin);
}

export async function createEnquiry(input: CreateEnquiryInput) {
  await ensureProductSchema();
  await getD1().prepare(`INSERT INTO enquiries
    (name, company, email, phone, product_interest, message)
    VALUES (?, ?, ?, ?, ?, ?)`)
    .bind(input.name, input.company, input.email, input.phone, input.productInterest, input.message)
    .run();
}

export async function listEnquiries(): Promise<Enquiry[]> {
  await ensureProductSchema();
  const result = await getD1()
    .prepare("SELECT * FROM enquiries ORDER BY created_at DESC, id DESC LIMIT 50")
    .all<EnquiryRow>();
  return (result.results ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    company: row.company,
    email: row.email,
    phone: row.phone,
    productInterest: row.product_interest,
    message: row.message,
    createdAt: row.created_at,
  }));
}

export async function saveProductImage(image: File): Promise<string> {
  const extension = image.type === "image/png" ? "png" : image.type === "image/webp" ? "webp" : "jpg";
  const key = `${crypto.randomUUID()}.${extension}`;
  await getImageBucket().put(key, image.stream(), { httpMetadata: { contentType: image.type } });
  return key;
}

export async function readProductImage(key: string): Promise<StoredProductImage | null> {
  const object = await getImageBucket().get(key);
  if (!object) return null;
  return {
    body: object.body,
    contentType: object.httpMetadata?.contentType || "application/octet-stream",
    etag: object.httpEtag,
  };
}

export async function removeProductImage(key: string): Promise<void> {
  await getImageBucket().delete(key);
}

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    subtitle: row.subtitle,
    description: row.description,
    features: parseJson<string[]>(row.features, []),
    specs: parseJson<Record<string, string>>(row.specs, {}),
    imagePath: row.image_path,
    externalUrl: row.external_url,
    featured: Boolean(row.featured),
    createdAt: row.created_at,
  };
}

function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || `product-${Date.now().toString(36)}`;
}
