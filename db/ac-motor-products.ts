import type { CreateProductInput } from "./product-store-types";

/* Text below is taken from "AC INDUCTION MOTOR Description.docx". */

export const acMotorTitle = "AC INDUCTION MOTOR";

export const acMotorDescription =
  "An AC Induction Motor is an electric motor that converts electrical energy into mechanical energy to make machines and equipment rotate. It operates using alternating current (AC) electricity and is one of the most commonly used motors in industrial and commercial applications.";

export const acMotorUsesIntro = "The main purpose of an AC induction motor is to:";

export const acMotorUses = [
  "Drive and rotate machinery.",
  "Power pumps, fans, blowers, and compressors.",
  "Operate conveyors and material-handling equipment.",
  "Drive mixers and agitators.",
  "Provide reliable continuous operation for industrial equipment.",
  "Convert electrical power into mechanical movement efficiently.",
];

export const acMotorApplicationsIntro =
  "Electric motors are used in many applications to convert electrical energy into mechanical energy. They are essential in homes, industries, transportation, and commercial equipment.";

export const acMotorApplications = [
  {
    title: "Industrial applications",
    items: ["Conveyor belts", "Pumps and compressors", "Industrial machines", "Cranes and hoists"],
  },
  {
    title: "Household appliances",
    items: ["Electric fans", "Washing machines", "Refrigerators", "Vacuum cleaners and blenders"],
  },
  {
    title: "Transportation",
    items: ["Electric cars and motorcycles", "Electric trains", "Electric bicycles", "Elevators and escalators"],
  },
  {
    title: "Agriculture",
    items: ["Water pumps for irrigation", "Grain milling machines", "Feed mixers", "Agricultural processing equipment"],
  },
  {
    title: "Medical equipment",
    items: ["Dental drills", "Hospital beds", "Medical pumps", "Laboratory equipment"],
  },
  {
    title: "Commercial and construction applications",
    items: ["Electric drills", "Cutting machines", "Air-conditioning systems", "Building ventilation systems"],
  },
];

export const acMotorClosing = [
  "AC induction motors are widely used because they are simple, durable, reliable, and require relatively low maintenance.",
  "For example, an AC induction motor can drive a water pump, rotate an agitator inside a mixing tank, operate a conveyor belt, or power a ventilation fan.",
];

export const acMotorSimplyPut =
  "An AC induction motor uses electricity to produce rotation, allowing machines and equipment to operate.";

function motor(name: string, supply: string, mounting: string, imagePath: string, galleryImages: string[]): CreateProductInput {
  return {
    name,
    category: "Motors",
    subtitle: "AC Induction Motor",
    description: acMotorDescription,
    features: acMotorUses,
    specs: { Type: "AC Induction Motor", Supply: supply, Mounting: mounting },
    imagePath,
    galleryImages,
    externalUrl: null,
    featured: false,
  };
}

/* Product names are the original picture file names. */
export const acMotorProducts: CreateProductInput[] = [
  motor("Single phase B3 Foot Mounted", "Single phase", "B3 Foot Mounted", "/products/ac-motor/single-phase-b3-foot-mounted.webp", [
    "/ac-motor/motor-exploded-view.jpg",
  ]),
  motor("Single phase B5 flanges mounted", "Single phase", "B5 flanges mounted", "/products/ac-motor/single-phase-b5-flange-mounted.webp", [
    "/ac-motor/motor-exploded-view.jpg",
  ]),
  motor("Three phase B3 Flange Mounted", "Three phase", "B3 Flange Mounted", "/products/ac-motor/three-phase-b3-foot-mounted.webp", [
    "/ac-motor/three-phase-motor-blue-1.jpg",
    "/ac-motor/three-phase-motor-grey-3.jpg",
    "/ac-motor/three-phase-motor-crate.jpg",
    "/ac-motor/motor-exploded-view.jpg",
  ]),
  motor("Three phase B5 Flange Mounted", "Three phase", "B5 Flange Mounted", "/products/ac-motor/three-phase-b5-flange-mounted.webp", [
    "/ac-motor/three-phase-motor-blue-2.jpg",
    "/ac-motor/geared-motor-1.jpg",
    "/ac-motor/geared-motor-2.jpg",
    "/ac-motor/motor-exploded-view.jpg",
  ]),
];

export function productSlug(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/**
 * Product batches added to catalogs that already exist on the server.
 * Each batch is applied once; afterwards administrators can edit or delete
 * the products in /manage without them coming back.
 */
export const catalogSeedBatches: { id: string; products: CreateProductInput[] }[] = [
  { id: "2026-11-ac-induction-motors", products: acMotorProducts },
];
