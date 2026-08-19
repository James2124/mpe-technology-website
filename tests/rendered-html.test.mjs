import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("ships MP&E product pages without starter preview content", async () => {
  const [home, layout, catalog] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/products/page.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(home, /Built to keep/);
  assert.match(home, /listProducts/);
  assert.match(layout, /MP&E Technology/);
  assert.match(layout, /og\.png/);
  assert.match(catalog, /ProductExplorer/);
  assert.doesNotMatch(home + layout, /codex-preview|SkeletonPreview|Starter Project/);
});

test("uses native anchors for shared-hosting navigation", async () => {
  const navigationFiles = [
    "../app/components/SiteHeader.tsx",
    "../app/components/SiteFooter.tsx",
    "../app/components/ProductExplorer.tsx",
    "../app/page.tsx",
    "../app/contact/page.tsx",
    "../app/manage/page.tsx",
    "../app/products/[slug]/page.tsx",
  ];
  const source = (await Promise.all(
    navigationFiles.map((path) => readFile(new URL(path, import.meta.url), "utf8")),
  )).join("\n");

  assert.doesNotMatch(source, /from ["']next\/link["']/);
  assert.match(source, /<a\s+className="primary-btn"\s+href="\/products"[^>]*>/, );
  assert.match(source, /<a href={`\/products\/\${product\.slug}`}>/);
});
