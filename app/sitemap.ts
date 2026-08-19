import type { MetadataRoute } from "next";
import { listProducts } from "../db/products";
import { absoluteUrl } from "./lib/url";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await listProducts();

  const baseUrl = await absoluteUrl("/");
  const origin = new URL(baseUrl).origin;

  const makeUrl = (path: string) =>
    new URL(path, origin).toString();

  const productPages: MetadataRoute.Sitemap =
    products.map((product) => ({
      url: makeUrl(
        `/products/${product.slug}`,
      ),
      lastModified: product.createdAt
        ? new Date(product.createdAt)
        : undefined,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [
    {
      url: makeUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: makeUrl("/products"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: makeUrl("/contact"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...productPages,
  ];
}
