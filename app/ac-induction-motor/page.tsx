import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { listProducts } from "../../db/products";
import { getPagePhotoGroups } from "../../db/page-photos";
import {
  acMotorClosing,
  acMotorDescription,
  acMotorProducts,
  acMotorSimplyPut,
  acMotorTitle,
  productSlug,
} from "../../db/ac-motor-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AC Induction Motor | MP&E Technology Malaysia",
  description: acMotorDescription,
  alternates: {
    canonical: "/ac-induction-motor",
  },
};

export default async function AcInductionMotorPage() {
  const [products, photoGroups] = await Promise.all([listProducts(), getPagePhotoGroups("/ac-induction-motor")]);
  const supportPhotos = photoGroups.flatMap((group) => group.photos);
  const liveSlugs = new Set(products.map((product) => product.slug));

  return (
    <main>
      <SiteHeader />

      <section className="page-hero catalog-hero acm-hero" data-reveal="up">
        <p className="eyebrow"><span /> DESCRIPTION</p>
        <h1>{acMotorTitle}</h1>
        <p>{acMotorDescription}</p>
      </section>

      <section className="section acm-range">
        <div className="section-heading" data-reveal="up">
          <p className="eyebrow"><span /> PRODUCT</p>
        </div>

        <div className="acm-range-grid" data-reveal="stagger" data-reveal-delay="1">
          {acMotorProducts.map((product) => {
            const slug = productSlug(product.name);
            const href = liveSlugs.has(slug)
              ? `/products/${slug}`
              : `/contact?product=${encodeURIComponent(product.name)}`;
            return (
              <a className="acm-range-card" href={href} key={slug}>
                {product.imagePath && (
                  <img src={product.imagePath} alt={product.name} loading="lazy" decoding="async" />
                )}
                <strong>{product.name}</strong>
                <b>{liveSlugs.has(slug) ? "View product ↗" : "Enquire ↗"}</b>
              </a>
            );
          })}
        </div>
      </section>

      <section className="section acm-anatomy">
        <figure className="acm-anatomy-figure" data-reveal="up">
          <img
            src="/ac-motor/motor-exploded-view.jpg"
            alt="AC induction motor cut away"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>

      <section className="section acm-applications">
        <div className="acm-closing acm-closing-only" data-reveal="up">
          {acMotorClosing.filter((text) => !text.startsWith("For example")).map((text) => <p key={text}>{text}</p>)}
          <p className="acm-why"><strong>Simply put:</strong> {acMotorSimplyPut}</p>
        </div>
      </section>

      {supportPhotos.length > 0 && (
      <section className="section acm-stock">
        <div className="acm-stock-grid" data-reveal="stagger">
          {supportPhotos.map((src) => (
            <figure key={src}>
              <img src={src} alt="MP&E Technology AC induction motor" loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </section>
      )}

      <section className="catalog-cta" data-reveal="up">
        <div><span>{acMotorTitle}</span><strong>Enquire about this product</strong></div>
        <a className="lime-btn dark-text" href="/contact?product=AC%20Induction%20Motor" data-magnetic>Enquire <span>→</span></a>
      </section>

      <SiteFooter />
    </main>
  );
}
