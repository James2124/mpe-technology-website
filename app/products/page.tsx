import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { ProductExplorer } from "../components/ProductExplorer";
import { listProducts } from "../../db/products";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Products | MP&E Technology",

  description:
    "Browse MP&E Technology gear reducers, electric motors, couplings, pulleys and industrial V-belts.",

  alternates: {
    canonical: "/products",
  },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [products, params] = await Promise.all([listProducts(), searchParams]);
  return (
    <main>
      <SiteHeader />
      <section className="page-hero catalog-hero" data-reveal="up">
        <p className="eyebrow"><span /> PRODUCT CATALOG</p>
        <h1>Power, connected.</h1>
        <p>Browse our core range of mechanical power-transmission components. No checkout—just clear product information and a direct path to enquiry.</p>
      </section>
      <section className="catalog-section">
        <ProductExplorer products={products} initialCategory={params.category} />
      </section>
      <section className="catalog-cta" data-reveal="up">
        <div><span>Can’t find the exact model?</span><strong>Send us a photo or part number.</strong></div>
        <a className="lime-btn dark-text" href="/contact" data-magnetic>Ask for a product match <span>→</span></a>
      </section>
      <SiteFooter />
    </main>
  );
}
