import { CursorEffects } from "./components/CursorEffects";
import { WhyVisual } from "./components/WhyVisual"; 
import { HeroVisual } from "./components/HeroVisual";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { ScrollReveal } from "./components/ScrollReveal";
import { listProducts } from "../db/products";

export const dynamic = "force-dynamic";

const categories = [
  {
    number: "01",
    title: "Gear reducers",
    copy: "Compact, high-torque speed reduction for demanding machine applications.",
    href: "/products?category=Gear%20Reducers",
  },
  {
    number: "02",
    title: "Electric motors",
    copy: "Dependable industrial drive power in versatile mounting configurations.",
    href: "/products?category=Motors",
  },
  {
    number: "03",
    title: "Couplings",
    copy: "Flexible shaft connections engineered to reduce shock and vibration.",
    href: "/products?category=Couplings",
  },
  {
    number: "04",
    title: "Belts & pulleys",
    copy: "Efficient mechanical power transfer with broad size availability.",
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
      <ScrollReveal />
      <CursorEffects />
      <SiteHeader />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span /> INDUSTRIAL POWER TRANSMISSION
          </p>

          <h1>
            Built to keep
            <br />
            industry <em>moving.</em>
          </h1>

          <p className="hero-lede">
            Reliable motors, gear reducers and transmission components—selected
            for your application and ready to work.
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
          <span>●</span> Practical product guidance
        </p>

        <p>
          <span>●</span> Industrial-grade components
        </p>

        <p>
          <span>●</span> Local enquiry support
        </p>
      </section>

      <section className="section category-section">
        <div
          className="section-heading"
          data-reveal="up"
        >
          <p className="eyebrow">
            <span /> OUR PRODUCT RANGE
          </p>

          <h2>
            Everything between
            <br />
            power and <em>motion.</em>
          </h2>

          <p>
            Find the core components that connect, reduce and transfer power
            across your machinery.
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
            The right part.
            <br />
            The right <em>fit.</em>
          </h2>

          <p className="why-lede">
            Choosing a transmission component is about more than a part number.
            We help you narrow the options around your mounting, speed and
            torque requirements.
          </p>

          <ol>
            <li>
              <span>01</span>

              <div>
                <strong>Share your requirement</strong>

                <p>
                  Tell us the application, dimensions or current part reference.
                </p>
              </div>
            </li>

            <li>
              <span>02</span>

              <div>
                <strong>Match the component</strong>

                <p>
                  We help identify a practical model, size and configuration.
                </p>
              </div>
            </li>

            <li>
              <span>03</span>

              <div>
                <strong>Enquire with confidence</strong>

                <p>
                  Review the product details, then contact us or continue
                  through Shopee.
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
            <span /> NEED A PRODUCT MATCH?
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
