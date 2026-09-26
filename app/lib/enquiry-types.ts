import type { EnquiryType } from "./types";

export const ENQUIRY_TYPE_LABELS: Record<EnquiryType, string> = {
  product: "Product enquiry",
  repair: "Repair & servicing",
  customization: "Custom machining",
  general: "General enquiry",
};

export const ENQUIRY_TYPE_OPTIONS: { value: EnquiryType; label: string }[] = [
  { value: "product", label: ENQUIRY_TYPE_LABELS.product },
  { value: "repair", label: ENQUIRY_TYPE_LABELS.repair },
  { value: "customization", label: ENQUIRY_TYPE_LABELS.customization },
  { value: "general", label: ENQUIRY_TYPE_LABELS.general },
];

export function parseEnquiryType(value: string): EnquiryType {
  return value in ENQUIRY_TYPE_LABELS ? (value as EnquiryType) : "general";
}
