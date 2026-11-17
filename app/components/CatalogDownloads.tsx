import type { Product, ProductCatalog } from "../lib/types";

/**
 * Downloadable catalogs of the given products (live data, so admin edits show up),
 * each catalog listed once with the products it belongs to.
 */
export function CatalogDownloads({ products, slugs }: { products: Product[]; slugs: string[] }) {
  const bySlug = new Map(products.map((product) => [product.slug, product]));
  const entries = new Map<string, { catalog: ProductCatalog; names: string[] }>();
  for (const slug of slugs) {
    const product = bySlug.get(slug);
    for (const catalog of product?.catalogs ?? []) {
      const entry = entries.get(catalog.pdfPath) ?? { catalog, names: [] };
      if (!entry.names.includes(product!.name)) entry.names.push(product!.name);
      entries.set(catalog.pdfPath, entry);
    }
  }
  if (entries.size === 0) return null;

  return (
    <section className="catalog-download-section info-catalogs">
      <div className="section-heading" data-reveal="up">
        <p className="eyebrow"><span /> PRODUCT CATALOGS</p>
        <h2>Download<br /><em>catalogs.</em></h2>
        <p>Click a cover to download the catalog PDF.</p>
      </div>
      <div className="catalog-download-grid" data-reveal="stagger" data-reveal-delay="1">
        {[...entries.values()].map(({ catalog, names }) => (
          <a key={catalog.pdfPath} className="catalog-download-card" href={catalog.pdfPath} download>
            <img src={catalog.coverImagePath} alt={`${names.join(", ")} catalog`} loading="lazy" decoding="async" />
            <small>{names.join(" · ")}</small>
            <span>Download catalog ↓</span>
          </a>
        ))}
      </div>
    </section>
  );
}
