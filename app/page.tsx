import { WhyVisual } from "./components/WhyVisual"; 
import { HeroVisual } from "./components/HeroVisual";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { listProducts } from "../db/products";

export const dynamic = "force-dynamic";

const categories = [
  {
    number: "01",
    title: "Gear reducers",
    copy: "Meg, Pei Gong, Motovario, Varvel, Nord, Sumitomo, Siemens.",
    href: "/products?category=Gear%20Reducers",
  },
  {
    number: "02",
    title: "Electric motors",
    copy: "Teco, Eledelta, CMG, Electrim, Elprom, ABB, Siemens.",
    href: "/products?category=Motors",
  },
  {
    number: "03",
    title: "Couplings",
    copy: "Power transmission products: coupling, sprocket & chain and more.",
    href: "/products?category=Couplings",
  },
  {
    number: "04",
    title: "Belts & pulleys",
    copy: "Power transmission products: pulley & belt.",
    href: "/products?category=V-Belts",
  },
];

export default async function Home() {
  const products = await listProducts();

  const featured = products
    .filter((product) => product.featured)
    .slice(0, 3);

  return (
    <main>
      <SiteHeader />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span /> METAL PROCESSING ENGINEERING &amp; INDUSTRY SUPPLY
          </p>

          <h1>
            Built to keep
            <br />
            industry <em>moving.</em>
          </h1>

          <p className="hero-lede">
            Electric motors, gear reducers, pumps, bearings and power
            transmission products. A one stop shop for all industry.
          </p>

          <div className="hero-actions">
            <a className="primary-btn" href="/products" data-magnetic>
              Explore products <span>→</span>
            </a>

            <a className="text-link" href="/contact">
              Talk to our team <span>↗</span>
            </a>
          </div>

          <div
            className="category-row"
            aria-label="Product categories"
          >
            <span>
              01 <b>Gear Reducers</b>
            </span>

            <span>
              02 <b>Motors</b>
            </span>

            <span>
              03 <b>Couplings</b>
            </span>

            <span>
              04 <b>V-Belts</b>
            </span>
          </div>
        </div>

        <HeroVisual />
      </section>

      <section
        className="trust-strip"
        data-reveal="fade"
      >
        <p>
          <span>●</span> High quality, reliable products
        </p>

        <p>
          <span>●</span> Services &amp; technical backup
        </p>

        <p>
          <span>●</span> One stop shop for all industry
        </p>
      </section>

      <section className="section category-section">
        <div
          className="section-heading"
          data-reveal="up"
        >
          <p className="eyebrow">
            <span /> PRODUCT SPECIALIST
          </p>

          <h2>
            Everything between
            <br />
            power and <em>motion.</em>
          </h2>

          <p>
            Electric motors, gear reducers, pumps, bearings and power
            transmission products from the brands we supply.
          </p>
        </div>

        <div
          className="category-grid"
          data-reveal="stagger"
          data-reveal-delay="1"
        >
          {categories.map((category) => (
            <a
              className="category-card"
              href={category.href}
              key={category.number}
            >
              <span>{category.number}</span>
              <h3>{category.title}</h3>
              <p>{category.copy}</p>
              <b>Explore category ↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="section featured-section">
        <div
          className="section-heading inline"
          data-reveal="up"
        >
          <div>
            <p className="eyebrow light">
              <span /> SELECTED PRODUCTS
            </p>

            <h2>
              Built for the
              <br />
              <em>real world.</em>
            </h2>
          </div>

          <a
            className="text-link light-link"
            href="/products"
          >
            View all products <span>↗</span>
          </a>
        </div>

        <div
          className="home-products"
          data-reveal="stagger"
          data-reveal-delay="1"
        >
          {featured.map((product, index) => (
            <article key={product.id}>
              <a
                className="home-product-image"
                href={`/products/${product.slug}`}
                data-cursor-effect
              >
                <span>
                  /{String(index + 1).padStart(2, "0")}
                </span>

                {product.imagePath && (
                  <img
                    src={product.imagePath}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </a>

              <small>{product.category}</small>

              <h3>
                <a href={`/products/${product.slug}`}>
                  {product.name}
                </a>
              </h3>

              <p>{product.subtitle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section category-section" data-reveal="fade">
        <div className="section-heading" data-reveal="up">
          <p className="eyebrow"><span /> AGENCY SUPPORT PRODUCT</p>
          <h2>
            Design, fabricate,<br />
            service &amp; <em>repair.</em>
          </h2>
          <p>
            Hydraulic parts and systems, electrical automation control systems,
            and metal processing &amp; engineering works.
          </p>
        </div>
        <div className="category-grid" data-reveal="stagger" data-reveal-delay="1">
          <a className="category-card" href="/services">
            <span>01</span>
            <h3>Services &amp; Repair</h3>
            <p>Hydraulic part &amp; system: design and fabricate, supply, service and repair.</p>
            <b>Explore services ↗</b>
          </a>
          <a className="category-card" href="/customize">
            <span>02</span>
            <h3>Design &amp; Fabricate</h3>
            <p>Electrical automation control systems and metal processing &amp; engineering works.</p>
            <b>Explore customization ↗</b>
          </a>
        </div>
      </section>

      <section
        className="section why-section"
        id="why-us"
      >
        <WhyVisual />

        <div
          className="why-copy"
          data-reveal="right"
          data-reveal-delay="1"
        >
          <p className="eyebrow">
            <span /> WHY MP&amp;E
          </p>

          <h2>
            Reliable products.
            <br />
            Technical <em>backup.</em>
          </h2>

          <p className="why-lede">
            We are a sales driven company. We depend on our valued customers to
            drive our action, and on our suppliers to provide us with high
            quality, reliable products, services and technical backup.
          </p>

          <ol>
            <li>
              <span>01</span>

              <div>
                <strong>Product specialist</strong>

                <p>
                  Electric motors, gear reducers, pumps, bearings and power
                  transmission products.
                </p>
              </div>
            </li>

            <li>
              <span>02</span>

              <div>
                <strong>Agency support product</strong>

                <p>
                  Hydraulic part &amp; system, electrical automation control
                  system, metal processing &amp; engineering works.
                </p>
              </div>
            </li>

            <li>
              <span>03</span>

              <div>
                <strong>Other product</strong>

                <p>
                  Tools, hardware, machinery and more.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section home-cta">
        <div
          className="home-cta-content"
          data-reveal="up"
        >
          <p className="eyebrow light">
            <span /> CONTACT MP&amp;E
          </p>

          <h2>
            Let’s keep your
            <br />
            operation <em>moving.</em>
          </h2>

          <a
            className="lime-btn"
            href="/contact" data-magnetic
          >
            Send us your requirement <span>→</span>
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
