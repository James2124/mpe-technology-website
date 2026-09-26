import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { EnquiryForm } from "../components/EnquiryForm";

export const metadata: Metadata = {
  title: "Services & Repair | MP&E Technology Malaysia",

  description:
    "Motor, gearbox and transmission repair and servicing from MP&E Technology in Malaysia. Send us your equipment details for an assessment.",

  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero catalog-hero" data-reveal="up">
        <p className="eyebrow"><span /> SERVICES</p>
        <h1>Repair &amp; servicing.</h1>
        <p>
          We&apos;re putting together the full details of our repair and servicing
          work. In the meantime, tell us what needs attention and our team will
          follow up directly.
        </p>
      </section>
      <section className="contact-layout">
        <div className="contact-intro" data-reveal="left">
          <p className="eyebrow light"><span /> REPAIR &amp; SERVICING</p>
          <h2>Tell us what<br />needs fixing.</h2>
          <p>Share the equipment type, model or fault description. We&apos;ll get back to you with next steps.</p>
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
