import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { listProducts } from "../../db/products";
import { getPagePhotoGroups } from "../../db/page-photos";
import { productSlug, type InfoSection, type ProductInfo } from "../../db/info/types";

function Section({ section }: { section: InfoSection }) {
  if (section.kind === "list") {
    return (
      <section className="spec-section acm-uses">
        <div data-reveal="left">
          <p className="eyebrow"><span /> {section.eyebrow.toUpperCase()}</p>
          {section.intro && <p className="acm-intro">{section.intro}</p>}
        </div>
        <div data-reveal="right" data-reveal-delay="1">
          <ul className="feature-list">
            {section.items.map((item) => (
              <li key={item}><span>✓</span>{item}</li>
            ))}
          </ul>
          {section.paragraphs?.map((text) => <p className="info-paragraph" key={text}>{text}</p>)}
        </div>
      </section>
    );
  }

  if (section.kind === "groups") {
    return (
      <section className="section acm-applications">
        <div className="section-heading" data-reveal="up">
          <p className="eyebrow"><span /> {section.eyebrow.toUpperCase()}</p>
          {section.intro?.map((text) => <p key={text}>{text}</p>)}
        </div>
        {section.subheading && <h3 className="info-subheading" data-reveal="up">{section.subheading}</h3>}
        <div className="category-grid acm-application-grid" data-reveal="stagger" data-reveal-delay="1">
          {section.groups.map((group, index) => (
            <div className="category-card" key={group.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
        {section.paragraphs && (
          <div className="acm-closing" data-reveal="up">
            {section.paragraphs.map((text) => <p key={text}>{text}</p>)}
          </div>
        )}
      </section>
    );
  }

  if (section.kind === "text") {
    return (
      <section className="section info-text">
        <div className="section-heading" data-reveal="up">
          {section.eyebrow && <p className="eyebrow"><span /> {section.eyebrow.toUpperCase()}</p>}
          {section.paragraphs.map((text) => <p key={text}>{text}</p>)}
        </div>
      </section>
    );
  }

  return (
    <section className="section info-diagrams">
      {section.eyebrow && (
        <div className="section-heading" data-reveal="up">
          <p className="eyebrow"><span /> {section.eyebrow.toUpperCase()}</p>
        </div>
      )}
      <div className="info-diagram-grid" data-reveal="stagger" data-reveal-delay="1">
        {section.images.map((image) => (
          <figure key={image.src}>
            <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>
    </section>
  );
}

export async function ProductInfoPage({ info }: { info: ProductInfo }) {
  const [products, allPhotoGroups] = await Promise.all([listProducts(), getPagePhotoGroups(info.path)]);
  const liveSlugs = new Set(products.map((product) => product.slug));
  const photoGroups = allPhotoGroups.filter((group) => group.photos.length > 0);

  return (
    <main>
      <SiteHeader />

      <section className="page-hero catalog-hero acm-hero" data-reveal="up">
        <p className="eyebrow"><span /> DESCRIPTION</p>
        <h1>{info.title}</h1>
        {info.logo && <img className="info-hero-logo" src={info.logo.src} alt={info.logo.alt} />}
        <p>{info.description}</p>
      </section>

      {info.productGroups.map((group, groupIndex) => (
        <section className="section acm-range info-range" key={group.title ?? groupIndex}>
          <div className="info-range-heading" data-reveal="up">
            <p className="eyebrow"><span /> PRODUCT{group.title ? ` · ${group.title}` : ""}</p>
            {group.logo && <img src={group.logo.src} alt={group.logo.alt} />}
          </div>
          <div className="acm-range-grid" data-reveal="stagger" data-reveal-delay="1">
            {group.products.map((product) => {
              const slug = productSlug(product.name);
              const live = liveSlugs.has(slug);
              return (
                <a
                  className="acm-range-card"
                  href={live ? `/products/${slug}` : `/contact?product=${encodeURIComponent(product.name)}`}
                  key={slug}
                >
                  {product.imagePath && (
                    <img src={product.imagePath} alt={product.name} loading="lazy" decoding="async" />
                  )}
                  <strong>{product.name}</strong>
                  <b>{live ? "View product ↗" : "Enquire ↗"}</b>
                </a>
              );
            })}
          </div>
        </section>
      ))}

      {info.sections.map((section, index) => <Section section={section} key={index} />)}

      {info.simplyPut && (
        <section className="section info-simply">
          <p className="acm-why" data-reveal="up"><strong>{info.simplyPut.label}</strong> {info.simplyPut.text}</p>
        </section>
      )}

      {photoGroups.map((group, index) => (
        <section className="section acm-stock" key={group.title ?? index}>
          {group.title && (
            <div className="info-range-heading" data-reveal="up">
              <p className="eyebrow"><span /> {group.title}</p>
            </div>
          )}
          <div className="acm-stock-grid" data-reveal="stagger">
            {group.photos.map((src) => (
              <figure key={src}>
                <img src={src} alt={`${group.title ?? info.title} – MP&E Technology`} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </section>
      ))}

      <section className="catalog-cta" data-reveal="up">
        <div><span>{info.title}</span><strong>Enquire about this product</strong></div>
        <a className="lime-btn dark-text" href={`/contact?product=${encodeURIComponent(info.title)}`} data-magnetic>Enquire <span>→</span></a>
      </section>

      <SiteFooter />
    </main>
  );
}
