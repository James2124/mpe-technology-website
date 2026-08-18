import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable(
  "products",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    subtitle: text("subtitle").notNull().default(""),
    description: text("description").notNull(),
    features: text("features").notNull().default("[]"),
    specs: text("specs").notNull().default("{}"),
    imagePath: text("image_path"),
    externalUrl: text("external_url"),
    featured: integer("featured", { mode: "boolean" }).notNull().default(false),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("idx_products_category").on(table.category),
    index("idx_products_featured_created").on(table.featured, table.createdAt),
  ],
);

export const adminUsers = sqliteTable("admin_users", {
  userId: text("user_id").primaryKey(),
  email: text("email").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const enquiries = sqliteTable(
  "enquiries",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    company: text("company").notNull().default(""),
    email: text("email").notNull(),
    phone: text("phone").notNull().default(""),
    productInterest: text("product_interest").notNull().default(""),
    message: text("message").notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("idx_enquiries_created").on(table.createdAt)],
);
