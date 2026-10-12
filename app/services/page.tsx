import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { EnquiryForm } from "../components/EnquiryForm";

export const metadata: Metadata = {
  title: "Services & Repair | MP&E Technology Malaysia",

  description:
    "Supply, service and repair of electric motors, gear reducers, pumps and hydraulic systems, plus electrical automation control systems, from MP&E Technology Works in Balakong, Selangor.",

  alternates: {
    canonical: "/services",
  },
};

const services = [
  {
    number: "01",
    title: "Hydraulic parts & systems",
    copy: "Hydraulic parts and complete systems, supported from start to finish.",
    points: ["Design & fabricate", "Supply", "Service & repair"],
  },
  {
    number: "02",
    title: "Electrical automation control",
    copy: "Electrical automation control systems designed and fabricated for your machinery.",
    points: ["Control system design", "Panel fabrication", "Installation support"],
  },
  {
    number: "03",
    title: "Motor, gearbox & pump service",
    copy: "Servicing and repair for the drive equipment that keeps your line running.",
    points: ["Electric motors", "Gear reducers", "Pumps"],
  },
  {
    number: "04",
    title: "Metal processing & engineering",
    copy: "In-house metal processing and engineering works to support repairs and replacements.",
    points: ["Machining", "Fabrication", "Part reconditioning"],
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
          MP&amp;E Technology Works is a one-stop industry supplier. Beyond
          supplying motors, gear reducers, pumps and bearings, we design,
          fabricate, service and repair the systems that run your plant.
        </p>
      </section>

      <section className="section category-section">
        <div className="section-heading" data-reveal="up">
          <p className="eyebrow"><span /> WHAT WE DO</p>
          <h2>
            Support that goes<br />
            beyond the <em>part.</em>
          </h2>
          <p>
            Backed by our suppliers&apos; technical support, our team handles
            hydraulics, automation and drive equipment for industries across
            Malaysia.
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
          <p>
            We carry a large product range from trusted manufacturers. Ask us
            about a specific model or replacement part.
          </p>
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
