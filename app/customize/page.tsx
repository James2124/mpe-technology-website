import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { EnquiryForm } from "../components/EnquiryForm";

export const metadata: Metadata = {
  title: "Design & Fabricate | MP&E Technology Malaysia",

  description:
    "MP&E Technology Works designs and fabricates hydraulic parts and systems, electrical automation control systems, and metal processing & engineering works.",

  alternates: {
    canonical: "/customize",
  },
};

const capabilities = [
  {
    number: "01",
    title: "Hydraulic part & system",
    copy: "Design and fabricate, supply, service and repair.",
  },
  {
    number: "02",
    title: "Electrical automation control system",
    copy: "Design and fabricate.",
  },
  {
    number: "03",
    title: "Metal processing & engineering works",
    copy: "Design and fabricate.",
  },
];

const projectCount = 4;

export default function CustomizePage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero catalog-hero" data-reveal="up">
        <p className="eyebrow"><span /> CUSTOMIZATION</p>
        <h1>Design &amp; fabricate.</h1>
        <p>
          We design and fabricate hydraulic parts and systems, electrical
          automation control systems, and metal processing &amp; engineering
          works.
        </p>
      </section>

      <section className="section category-section">
        <div className="section-heading" data-reveal="up">
          <p className="eyebrow"><span /> AGENCY SUPPORT PRODUCT</p>
          <h2>
            What we design<br />
            &amp; <em>fabricate.</em>
          </h2>
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
            Metal processing &amp; engineering works from our previous jobs.
          </p>
        </div>
        <div className="project-grid" data-reveal="stagger" data-reveal-delay="1">
          {Array.from({ length: projectCount }, (_, index) => {
            const job = index + 1;
            return (
              <article className="project-card" key={job}>
                <div className="project-compare">
                  <figure>
                    <img src={`/projects/job-${job}-before.jpg`} alt={`Job ${job} before machining`} loading="lazy" decoding="async" />
                    <figcaption className="tag-before">Before</figcaption>
                  </figure>
                  <span className="project-arrow" aria-hidden="true">→</span>
                  <figure>
                    <img src={`/projects/job-${job}-after.jpg`} alt={`Job ${job} after machining`} loading="lazy" decoding="async" />
                    <figcaption className="tag-after">After</figcaption>
                  </figure>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="contact-layout">
        <div className="contact-intro" data-reveal="left">
          <p className="eyebrow light"><span /> CUSTOM WORK</p>
          <h2>Tell us what<br />you need <em>made.</em></h2>
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
