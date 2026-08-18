import { env } from "cloudflare:workers";
import type { ChatGPTUser } from "../app/chatgpt-auth";
import type { Enquiry, Product } from "../app/lib/types";

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

type CreateProductInput = Omit<Product, "id" | "slug" | "createdAt"> & {
  slug?: string;
};

const SHOPEE =
  "https://shopee.com.my/mimax_indsup?categoryId=102187&entryPoint=ShopByPDP&itemId=22587403565";

const starterProducts: CreateProductInput[] = [
  {
    name: "WPX 50 Worm Gear Reducer",
    category: "Gear Reducers",
    subtitle: "Right-angle speed reduction",
    description:
      "A compact cast-iron worm gear reducer for dependable torque multiplication in conveyors, mixers and general industrial machinery.",
    features: ["Compact right-angle drive", "Rigid cast-iron housing", "Multiple ratio options"],
    specs: { Series: "WPX", Size: "50", Type: "Worm gear reducer", Mounting: "Foot mounted" },
    imagePath: "/products/worm-reducer.png",
    externalUrl: SHOPEE,
    featured: true,
  },
  {
    name: "B5 Three-Phase AC Motor",
    category: "Motors",
    subtitle: "Flange-mounted induction motor",
    description:
      "A robust three-phase induction motor with B5 flange mounting for pumps, reducers, fans and production equipment.",
    features: ["B5 flange mounting", "Finned housing for cooling", "Industrial continuous-duty design"],
    specs: { Supply: "Three phase", Mounting: "B5 flange", Protection: "Industrial enclosed", Application: "General machinery" },
    imagePath: "/products/motor.webp",
    externalUrl: SHOPEE,
    featured: true,
  },
  {
    name: "FCL Flexible Pin-Bush Coupling",
    category: "Couplings",
    subtitle: "Smooth torque transmission",
    description:
      "A practical flexible coupling that cushions shock loads, reduces vibration and accommodates minor shaft misalignment.",
    features: ["Replaceable rubber bushes", "Vibration damping", "Simple maintenance"],
    specs: { Series: "FCL", Material: "Cast iron", Element: "Rubber pin bush", Use: "Motor-to-driven shaft" },
    imagePath: "/products/coupling.png",
    externalUrl: SHOPEE,
    featured: true,
  },
  {
    name: "1610 Taper Lock V-Belt Pulley",
    category: "Pulleys",
    subtitle: "Fast, secure shaft mounting",
    description:
      "A taper-lock pulley system designed for convenient installation, reliable concentricity and easy removal from the shaft.",
    features: ["Machining-free shaft fit", "Multiple groove profiles", "Easy installation and removal"],
    specs: { Bush: "1610", Profiles: "SPZ / SPA / SPB", Material: "Cast iron", Bore: "Multiple sizes" },
    imagePath: "/products/pulley.webp",
    externalUrl: SHOPEE,
    featured: false,
  },
  {
    name: "Classical Industrial V-Belt",
    category: "V-Belts",
    subtitle: "Reliable flexible power transfer",
    description:
      "A durable classical-section V-belt for smooth, quiet power transmission across a wide range of industrial equipment.",
    features: ["Oil and heat resistant", "Low-stretch tension member", "Broad size availability"],
    specs: { Type: "Classical V-belt", Sections: "A / B series", Material: "Reinforced rubber", Use: "Industrial drives" },
    imagePath: "/products/v-belt.png",
    externalUrl: SHOPEE,
    featured: false,
  },
  {
    name: "NMRV Aluminium Worm Reducer",
    category: "Gear Reducers",
    subtitle: "Lightweight modular gearbox",
    description:
      "A modular aluminium worm reducer offering flexible mounting positions and a clean, compact footprint for machine builders.",
    features: ["Lightweight aluminium housing", "Flexible mounting positions", "Quiet running"],
    specs: { Series: "NMRV", Housing: "Aluminium", Drive: "Right angle", Lubrication: "Long-life oil" },
    imagePath: "/products/nmrv.jpg",
    externalUrl: SHOPEE,
    featured: false,
  },
];

function getD1(): D1Database {
  const binding = (env as unknown as { DB?: D1Database }).DB;
  if (!binding) throw new Error("D1 binding DB is unavailable");
  return binding;
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
  const existing = await getProductBySlug(slug);
  if (existing) slug = `${base}-${Date.now().toString(36)}`;
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

export async function createEnquiry(input: Omit<Enquiry, "id" | "createdAt">) {
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
