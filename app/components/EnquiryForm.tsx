import type { EnquiryType } from "../lib/types";

export function EnquiryForm({
  enquiryType,
  submitLabel = "Send enquiry",
}: {
  enquiryType: EnquiryType;
  submitLabel?: string;
}) {
  return (
    <form action="/api/enquiries" method="post" data-reveal="stagger" data-reveal-delay="1">
      <input type="hidden" name="enquiryType" value={enquiryType} />
      <div className="form-row">
        <label><span>Your name *</span><input name="name" required autoComplete="name" /></label>
        <label><span>Company</span><input name="company" autoComplete="organization" /></label>
      </div>
      <div className="form-row">
        <label><span>Email *</span><input type="email" name="email" required autoComplete="email" /></label>
        <label><span>Phone / WhatsApp</span><input name="phone" autoComplete="tel" /></label>
      </div>
      <label><span>Tell us what you need *</span><textarea name="message" required rows={6} placeholder="Describe the equipment, application or job you need help with..." /></label>
      <button className="primary-btn form-submit" type="submit" data-magnetic>{submitLabel} <span>→</span></button>
    </form>
  );
}
