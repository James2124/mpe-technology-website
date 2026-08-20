import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { absoluteUrl } from "../../lib/url";
import { getProductBySlug, listProducts } from "../../../db/products";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found | MP&E Technology" };
  const title = `${product.name} | MP&E Technology`;
  const description = product.description;
  const image = product.imagePath ? await absoluteUrl(product.imagePath) : null;
  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: { title, description, type: "website", images: image ? [{ url: image, alt: product.name }] : [] },
    twitter: { card: image ? "summary_large_image" : "summary", title, description, images: image ? [image] : [] },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, products] = await Promise.all([getProductBySlug(slug), listProducts()]);
  if (!product) notFound();
  const related = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 2);

  return (
    <main>
      <SiteHeader />
      <div className="product-breadcrumb" data-reveal="fade">
        <a href="/products">Products</a><span>/</span><span>{product.category}</span><span>/</span><strong>{product.name}</strong>
      </div>
      <section className="product-detail">
        <div className="detail-image" data-reveal="left">
          <span className="detail-tag">{product.category}</span>
          {product.imagePath ? <img src={product.imagePath} alt={product.name} fetchPriority="high" decoding="async" /> : <span className="image-placeholder">MP&amp;E</span>}
          <span className="detail-mark">MP&amp;E / TRANSMISSION</span>
        </div>
        <div className="detail-copy" data-reveal="right" data-reveal-delay="1">
          <p className="eyebrow"><span /> PRODUCT DETAIL</p>
          <h1>{product.name}</h1>
          <p className="detail-subtitle">{product.subtitle}</p>
          <p className="detail-description">{product.description}</p>
          <ul className="feature-list" data-reveal="stagger" data-reveal-delay="1">
            {product.features.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}
          </ul>
          <div className="detail-actions">
            <a className="primary-btn" href={`/contact?product=${encodeURIComponent(product.name)}`} data-magnetic>Enquire about this product <span>→</span></a>
            {product.externalUrl && <a className="text-link" href={product.externalUrl} target="_blank" rel="noreferrer">View Shopee store <span>↗</span></a>}
          </div>
        </div>
      </section>
      <section className="spec-section">
        <div data-reveal="left">
          <p className="eyebrow"><span /> AT A GLANCE</p>
          <h2>Product<br /><em>specification.</em></h2>
          <p>Specifications shown are a product-family guide. Confirm your required size and configuration with our team before ordering.</p>
        </div>
        <dl data-reveal="stagger" data-reveal-delay="1">
          {Object.entries(product.specs).map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </section>
      {related.length > 0 && (
        <section className="related-section">
          <div className="section-heading inline" data-reveal="up">
            <h2>Related <em>products.</em></h2>
            <a className="text-link" href="/products">All products ↗</a>
          </div>
          <div className="related-grid" data-reveal="stagger" data-reveal-delay="1">
            {related.map((item) => (
              <a href={`/products/${item.slug}`} key={item.id}>
                {item.imagePath && <img src={item.imagePath} alt={item.name} loading="lazy" decoding="async" />}
                <span>{item.category}</span><strong>{item.name}</strong><small>View product ↗</small>
              </a>
            ))}
          </div>
        </section>
      )}
      <SiteFooter />
    </main>
  );
}
