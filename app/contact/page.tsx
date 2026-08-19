import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact | MP&E Technology",
  description: "Send MP&E Technology your motor, gearbox, coupling, pulley or V-belt requirement.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; sent?: string }>;
}) {
  const params = await searchParams;
  return (
    <main>
      <SiteHeader />
      <section className="contact-layout">
        <div className="contact-intro" data-reveal="left">
          <p className="eyebrow light"><span /> CONTACT MP&amp;E</p>
          <h1>Tell us what<br />needs to <em>move.</em></h1>
          <p>Share a product name, photo reference or application detail. We’ll use it to narrow the right component.</p>
          <div className="contact-points" data-reveal="stagger" data-reveal-delay="1">
            <div><span>01</span><strong>Product matching</strong><p>Model, size and configuration guidance.</p></div>
            <div><span>02</span><strong>Malaysia enquiries</strong><p>Local product and availability support.</p></div>
            <div><span>03</span><strong>Shopee available</strong><p>Continue to our store when you are ready.</p></div>
          </div>
        </div>
        <div className="contact-form-wrap" data-reveal="right" data-reveal-delay="1">
          {params.sent === "1" ? (
            <div className="success-message" role="status" data-reveal="up">
              <span>✓</span>
              <h2>Enquiry received.</h2>
              <p>Thank you. Your requirement has been recorded for follow-up.</p>
              <a className="text-link" href="/products">Continue browsing products ↗</a>
            </div>
          ) : (
            <>
              <p className="form-kicker">SEND AN ENQUIRY</p>
              <h2>What can we help you find?</h2>
              <form action="/api/enquiries" method="post" data-reveal="stagger" data-reveal-delay="1">
                <div className="form-row">
                  <label><span>Your name *</span><input name="name" required autoComplete="name" /></label>
                  <label><span>Company</span><input name="company" autoComplete="organization" /></label>
                </div>
                <div className="form-row">
                  <label><span>Email *</span><input type="email" name="email" required autoComplete="email" /></label>
                  <label><span>Phone / WhatsApp</span><input name="phone" autoComplete="tel" /></label>
                </div>
                <label><span>Product of interest</span><input name="productInterest" defaultValue={params.product ?? ""} placeholder="e.g. WPX 50 worm gear reducer" /></label>
                <label><span>Requirement *</span><textarea name="message" required rows={6} placeholder="Tell us the model, size, application or current part reference..." /></label>
                <button className="primary-btn form-submit" type="submit" data-magnetic>Send enquiry <span>→</span></button>
              </form>
            </>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
