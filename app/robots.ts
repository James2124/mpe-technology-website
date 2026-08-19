import type { MetadataRoute } from "next";
import { absoluteUrl } from "./lib/url";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = await absoluteUrl("/");
  const origin = new URL(baseUrl).origin;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/manage",
        "/api",
      ],
    },

    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
