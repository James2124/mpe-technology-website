import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { listProducts } from "../../db/products";
import {
  acMotorApplications,
  acMotorDescription,
  acMotorProducts,
  acMotorUses,
} from "../../db/ac-motor-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AC Induction Motors | MP&E Technology Malaysia",
  description:
    "Single-phase and three-phase AC induction motors in B3 foot-mounted and B5 flange-mounted versions for pumps, fans, blowers, compressors, conveyors and mixers.",
  alternates: {
    canonical: "/ac-induction-motor",
  },
};

const stockPhotos = [
  { src: "/ac-motor/container-loading-1.jpg", caption: "Crated motors loaded in a container" },
  { src: "/ac-motor/crated-motors-1.jpg", caption: "Motors packed in timber crates" },
  { src: "/ac-motor/motor-delivery-2.jpg", caption: "Three-phase motors on delivery" },
  { src: "/ac-motor/warehouse-stock-2.jpg", caption: "Warehouse racking" },
  { src: "/ac-motor/three-phase-motor-blue-1.jpg", caption: "Three-phase motors unpacked" },
  { src: "/ac-motor/container-loading-3.jpg", caption: "Crated motors ready for dispatch" },
  { src: "/ac-motor/crated-stock-2.jpg", caption: "Crated stock and boxed parts" },
  { src: "/ac-motor/geared-motor-1.jpg", caption: "Flange motor fitted to a gear unit" },
  { src: "/ac-motor/three-phase-motor-grey-2.jpg", caption: "Foot-mounted three-phase motor" },
  { src: "/ac-motor/motor-delivery-1.jpg", caption: "Motors on a delivery truck" },
  { src: "/ac-motor/warehouse-shelving.jpg", caption: "Boxed parts on shelving" },
  { src: "/ac-motor/parts-stock-1.jpg", caption: "Parts stock on pallets" },
];

export default async function AcInductionMotorPage() {
  const products = await listProducts();
  const liveSlugs = new Set(products.map((product) => product.slug));

  return (
    <main>
      <SiteHeader />

      <section className="page-hero catalog-hero" data-reveal="up">
        <p className="eyebrow"><span /> AC INDUCTION MOTOR</p>
        <h1>Electricity into motion.</h1>
        <p>{acMotorDescription}</p>
      </section>

      <section className="section acm-range">
        <div className="section-heading" data-reveal="up">
          <p className="eyebrow"><span /> THE RANGE</p>
          <h2>
            Single &amp; three phase.
            <br />
            Foot or <em>flange.</em>
          </h2>
          <p>
            Choose B3 foot mounting to bolt the motor to a base plate, or a B5
            flange to couple it directly to a gear reducer, pump or other
            driven equipment.
          </p>
        </div>

        <div className="acm-range-grid" data-reveal="stagger" data-reveal-delay="1">
          {acMotorProducts.map((product) => {
            const slug = product.slug ?? "";
            const href = liveSlugs.has(slug)
              ? `/products/${slug}`
              : `/contact?product=${encodeURIComponent(product.name)}`;
            return (
              <a className="acm-range-card" href={href} key={slug}>
                {product.imagePath && (
                  <img src={product.imagePath} alt={product.name} loading="lazy" decoding="async" />
                )}
                <span>{product.specs.Supply} · {product.specs.Mounting}</span>
                <strong>{product.name.replace(/ – .*/, "")}</strong>
                <small>{product.subtitle}</small>
                <b>{liveSlugs.has(slug) ? "View product ↗" : "Enquire ↗"}</b>
              </a>
            );
          })}
        </div>
      </section>

      <section className="spec-section acm-uses">
        <div data-reveal="left">
          <p className="eyebrow"><span /> WHAT IT DOES</p>
          <h2>The use of<br /><em>the motor.</em></h2>
          <p>
            Simply put: an AC induction motor uses electricity to produce
            rotation, allowing machines and equipment to operate.
          </p>
        </div>
        <ul className="feature-list" data-reveal="stagger" data-reveal-delay="1">
          {acMotorUses.map((use) => (
            <li key={use}><span>✓</span>{use}</li>
          ))}
        </ul>
      </section>

      <section className="section acm-anatomy">
        <div className="section-heading" data-reveal="up">
          <p className="eyebrow"><span /> INSIDE THE MOTOR</p>
          <h2>
            Simple parts.
            <br />
            Durable <em>design.</em>
          </h2>
          <p>
            Stator, rotor, bearings, cooling fan and terminal box in a finned
            frame. The same motor takes B3 feet, a B5 flange or a B14 face
            flange to suit the installation.
          </p>
        </div>
        <figure className="acm-anatomy-figure" data-reveal="up" data-reveal-delay="1">
          <img
            src="/ac-motor/motor-exploded-view.jpg"
            alt="Exploded view of an AC induction motor showing the frame, stator, rotor, bearings, end shields, fan, fan cover, terminal box, feet and B5 and B14 flanges"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>

      <section className="section acm-applications">
        <div className="section-heading" data-reveal="up">
          <p className="eyebrow"><span /> APPLICATIONS</p>
          <h2>
            Wherever things
            <br />
            need to <em>turn.</em>
          </h2>
          <p>
            Electric motors are essential in homes, industries, transportation
            and commercial equipment. An AC induction motor can drive a water
            pump, rotate an agitator inside a mixing tank, operate a conveyor
            belt or power a ventilation fan.
          </p>
        </div>
        <div className="category-grid acm-application-grid" data-reveal="stagger" data-reveal-delay="1">
          {acMotorApplications.map((group, index) => (
            <div className="category-card" key={group.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="acm-why" data-reveal="up">
          AC induction motors are widely used because they are{" "}
          <strong>simple, durable, reliable</strong> and require{" "}
          <strong>relatively low maintenance.</strong>
        </p>
      </section>

      <section className="section acm-stock">
        <div className="section-heading" data-reveal="up">
          <p className="eyebrow"><span /> STOCK &amp; DELIVERY</p>
          <h2>
            From our warehouse
            <br />
            to your <em>site.</em>
          </h2>
          <p>
            Motors are crated in timber for protection in transit, held in our
            warehouse and delivered to customers.
          </p>
        </div>
        <div className="acm-stock-grid" data-reveal="stagger" data-reveal-delay="1">
          {stockPhotos.map((photo) => (
            <figure key={photo.src}>
              <img src={photo.src} alt={photo.caption} loading="lazy" decoding="async" />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="catalog-cta" data-reveal="up">
        <div><span>Need a specific power rating or frame size?</span><strong>Send us your motor nameplate or requirement.</strong></div>
        <a className="lime-btn dark-text" href="/contact?product=AC%20Induction%20Motor" data-magnetic>Enquire about AC motors <span>→</span></a>
      </section>

      <SiteFooter />
    </main>
  );
}
