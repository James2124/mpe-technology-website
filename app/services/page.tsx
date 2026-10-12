import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { EnquiryForm } from "../components/EnquiryForm";

export const metadata: Metadata = {
  title: "Services & Repair | MP&E Technology Malaysia",

  description:
    "MP&E Technology Works supplies electric motors, gear reducers, pumps, bearings and power transmission products, and provides hydraulic part and system design, fabrication, supply, service and repair. Balakong, Selangor.",

  alternates: {
    canonical: "/services",
  },
};

const services = [
  {
    number: "01",
    title: "Hydraulic part & system",
    copy: "Hydraulic parts and systems.",
    points: ["Design & fabricate", "Supply", "Service & repair"],
  },
  {
    number: "02",
    title: "Electrical automation control system",
    copy: "Electrical automation control systems.",
    points: ["Design & fabricate"],
  },
  {
    number: "03",
    title: "Metal processing & engineering works",
    copy: "Metal processing and engineering works.",
    points: ["Design & fabricate"],
  },
  {
    number: "04",
    title: "Product specialist",
    copy: "Electric motors, gear reducers, pumps, bearings and power transmission products.",
    points: ["Supply"],
  },
];

const brands = [
  {
    category: "Electric motors",
    names: ["Teco", "Eledelta", "CMG", "Electrim", "Elprom", "ABB", "Siemens"],
  },
  {
    category: "Gear reducers",
    names: ["MEG", "Pei Gong", "Motovario", "Varvel", "Nord", "Sumitomo", "Siemens"],
  },
  {
    category: "Pumps",
    names: ["Electra", "Lowara", "DAB", "Pedrollo", "BG Reich"],
  },
  {
    category: "Bearings",
    names: ["FAG", "NTN", "FYH", "SKF", "KOYO", "ASAHI", "Timken"],
  },
  {
    category: "Power transmission",
    names: ["Pulley & belt", "Sprocket & chain", "Coupling"],
  },
  {
    category: "Other products",
    names: ["Tools", "Hardware", "Machinery"],
  },
];

export default function ServicesPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero catalog-hero" data-reveal="up">
        <p className="eyebrow"><span /> SERVICES</p>
        <h1>Supply, service &amp; repair.</h1>
        <p>
          We are a sales driven company. We depend on our valued customers to
          drive our action, and on our suppliers to provide us with high
          quality, reliable products, services and technical backup.
        </p>
      </section>

      <section className="section category-section">
        <div className="section-heading" data-reveal="up">
          <p className="eyebrow"><span /> WHAT WE DO</p>
          <h2>
            One stop shop<br />
            for all <em>industry.</em>
          </h2>
          <p>
            Due to our large product range, we aim to be a one stop shop for
            all industry.
          </p>
        </div>
        <div className="category-grid" data-reveal="stagger" data-reveal-delay="1">
          {services.map((service) => (
            <article className="category-card service-card" key={service.number}>
              <span>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <ul className="service-points">
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section brand-section">
        <div className="section-heading" data-reveal="up">
          <p className="eyebrow"><span /> PRODUCT SPECIALIST</p>
          <h2>
            Brands we<br />
            <em>supply.</em>
          </h2>
        </div>
        <dl className="brand-table" data-reveal="stagger" data-reveal-delay="1">
          {brands.map((brand) => (
            <div key={brand.category}>
              <dt>{brand.category}</dt>
              <dd>
                {brand.names.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="contact-layout">
        <div className="contact-intro" data-reveal="left">
          <p className="eyebrow light"><span /> REPAIR &amp; SERVICING</p>
          <h2>Tell us what<br />needs fixing.</h2>
          <p>Share the equipment type, brand, model or fault description. We&apos;ll get back to you with next steps.</p>
          <div className="contact-points">
            <div><span>01</span><strong>Roger Poon</strong><p>016-201 2201 (H/P &amp; WhatsApp)</p></div>
            <div><span>02</span><strong>Terry Poon</strong><p>012-361 2312 (H/P &amp; WhatsApp)</p></div>
            <div><span>03</span><strong>Tel / Fax</strong><p>03-8959 2201</p></div>
          </div>
        </div>
        <div className="contact-form-wrap" data-reveal="right" data-reveal-delay="1">
          <p className="form-kicker">REQUEST A SERVICE</p>
          <h2>What needs repair?</h2>
          <EnquiryForm enquiryType="repair" submitLabel="Send service request" />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
