import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { EnquiryForm } from "../components/EnquiryForm";

export const metadata: Metadata = {
  title: "Custom Machining | MP&E Technology Malaysia",

  description:
    "Custom machining and fabrication from MP&E Technology in Malaysia. Send us your drawing or requirement for a quote.",

  alternates: {
    canonical: "/customize",
  },
};

export default function CustomizePage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero catalog-hero" data-reveal="up">
        <p className="eyebrow"><span /> CUSTOMIZATION</p>
        <h1>Custom machining.</h1>
        <p>
          We&apos;re putting together the full details of our custom machining
          capabilities. In the meantime, tell us what you need made and our
          team will follow up directly.
        </p>
      </section>
      <section className="contact-layout">
        <div className="contact-intro" data-reveal="left">
          <p className="eyebrow light"><span /> CUSTOM MACHINING</p>
          <h2>Tell us what<br />you need made.</h2>
          <p>Share your drawing, part reference or application detail. We&apos;ll get back to you with next steps.</p>
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
