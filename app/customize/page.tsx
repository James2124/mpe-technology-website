import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { EnquiryForm } from "../components/EnquiryForm";

export const metadata: Metadata = {
  title: "Custom Machining & Fabrication | MP&E Technology Malaysia",

  description:
    "Custom metal processing, machining and fabrication from MP&E Technology Works in Balakong, Selangor. Flanges, plates, discs and replacement parts made to your drawing or sample.",

  alternates: {
    canonical: "/customize",
  },
};

const capabilities = [
  {
    number: "01",
    title: "Metal processing & machining",
    copy: "Raw plate and stock machined into finished flanges, discs, rings and mounting plates.",
  },
  {
    number: "02",
    title: "Hydraulic system fabrication",
    copy: "Hydraulic parts and systems designed and fabricated to suit your machine.",
  },
  {
    number: "03",
    title: "Automation control systems",
    copy: "Electrical automation control systems designed and built for your process.",
  },
];

const steps = [
  {
    title: "Send your drawing or sample",
    copy: "Share a drawing, photo, dimensions or the worn part you need replaced.",
  },
  {
    title: "Review & quotation",
    copy: "We check material, tolerances and quantity, then quote the job.",
  },
  {
    title: "Fabricate & deliver",
    copy: "Your part is processed in our Balakong workshop and prepared for collection or delivery.",
  },
];

const projects = [
  { src: "/projects/machining-01.jpg", alt: "Cut steel plates before and after machining into flanged mounting plates" },
  { src: "/projects/machining-02.jpg", alt: "Rough steel discs before and after face machining and drilling" },
  { src: "/projects/machining-03.jpg", alt: "Rusted steel rings before and after machining into drilled flanges" },
  { src: "/projects/machining-04.jpg", alt: "Raw ring blank before and after machining into a slotted threaded lock nut" },
];

export default function CustomizePage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero catalog-hero" data-reveal="up">
        <p className="eyebrow"><span /> CUSTOMIZATION</p>
        <h1>Design &amp; fabricate.</h1>
        <p>
          From a single replacement part to a complete system, we design and
          fabricate to your specification: metal processing and engineering
          works, hydraulic systems and electrical automation control.
        </p>
      </section>

      <section className="section category-section">
        <div className="section-heading" data-reveal="up">
          <p className="eyebrow"><span /> CAPABILITIES</p>
          <h2>
            Made to<br />
            your <em>spec.</em>
          </h2>
          <p>
            When an off-the-shelf part won&apos;t fit, we make one that does.
          </p>
        </div>
        <div className="category-grid three" data-reveal="stagger" data-reveal-delay="1">
          {capabilities.map((item) => (
            <article className="category-card" key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section project-section">
        <div className="section-heading" data-reveal="up">
          <p className="eyebrow"><span /> OUR PREVIOUS JOBS</p>
          <h2>
            Before &amp;<br />
            <em>after.</em>
          </h2>
          <p>
            A few machining jobs from our workshop: rough cut plate and worn
            stock turned into finished, precision parts.
          </p>
        </div>
        <div className="project-grid" data-reveal="stagger" data-reveal-delay="1">
          {projects.map((project) => (
            <figure key={project.src}>
              <img src={project.src} alt={project.alt} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </section>

      <section className="section why-section custom-steps">
        <div className="why-copy" data-reveal="up">
          <p className="eyebrow"><span /> HOW IT WORKS</p>
          <h2>
            From drawing<br />
            to <em>finished part.</em>
          </h2>
          <ol>
            {steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="contact-layout">
        <div className="contact-intro" data-reveal="left">
          <p className="eyebrow light"><span /> CUSTOM WORK</p>
          <h2>Tell us what<br />you need made.</h2>
          <p>Share your drawing, part reference, material or quantity. We&apos;ll get back to you with next steps.</p>
        </div>
        <div className="contact-form-wrap" data-reveal="right" data-reveal-delay="1">
          <p className="form-kicker">REQUEST CUSTOM WORK</p>
          <h2>What do you need made?</h2>
          <EnquiryForm enquiryType="customization" submitLabel="Send request" />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
