import type { CreateProductInput } from "./product-store-types";

export const acMotorDescription =
  "An AC induction motor is an electric motor that converts electrical energy into mechanical energy to make machines and equipment rotate. It operates using alternating current (AC) electricity and is one of the most commonly used motors in industrial and commercial applications.";

export const acMotorUses = [
  "Drive and rotate machinery",
  "Power pumps, fans, blowers and compressors",
  "Operate conveyors and material-handling equipment",
  "Drive mixers and agitators",
  "Reliable continuous operation for industrial equipment",
  "Convert electrical power into mechanical movement efficiently",
];

export const acMotorApplications = [
  {
    title: "Industrial",
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
    title: "Commercial & construction",
    items: ["Electric drills", "Cutting machines", "Air-conditioning systems", "Building ventilation systems"],
  },
];

const applicationSpec = "Pumps, fans, blowers, compressors, conveyors, mixers";

export const acMotorProducts: CreateProductInput[] = [
  {
    slug: "three-phase-ac-induction-motor-b3-foot-mounted",
    name: "Three-Phase AC Induction Motor – B3 Foot Mounted",
    category: "Motors",
    subtitle: "Foot-mounted three-phase induction motor",
    description: `${acMotorDescription} This three-phase version uses B3 foot mounting for bolting directly to a base plate or machine frame.`,
    features: [
      "B3 foot mounting for base-plate installation",
      "Three-phase AC supply",
      "Drives pumps, fans, blowers and compressors",
      "Simple, durable and reliable design",
      "Relatively low maintenance",
    ],
    specs: {
      Type: "AC induction motor",
      Supply: "Three phase",
      Mounting: "B3 foot mounted",
      Cooling: "Finned frame with rear cooling fan",
      Application: applicationSpec,
    },
    imagePath: "/products/ac-motor/three-phase-b3-foot-mounted.webp",
    galleryImages: [
      "/ac-motor/three-phase-motor-blue-1.jpg",
      "/ac-motor/three-phase-motor-grey-3.jpg",
      "/ac-motor/three-phase-motor-crate.jpg",
      "/ac-motor/motor-exploded-view.jpg",
    ],
    externalUrl: null,
    featured: false,
  },
  {
    slug: "three-phase-ac-induction-motor-b5-flange-mounted",
    name: "Three-Phase AC Induction Motor – B5 Flange Mounted",
    category: "Motors",
    subtitle: "Flange-mounted three-phase induction motor",
    description: `${acMotorDescription} This three-phase version uses a B5 flange for direct coupling to gear reducers, pumps and other driven equipment.`,
    features: [
      "B5 flange mounting for direct coupling",
      "Three-phase AC supply",
      "Suits gear reducers, pumps and conveyors",
      "Simple, durable and reliable design",
      "Relatively low maintenance",
    ],
    specs: {
      Type: "AC induction motor",
      Supply: "Three phase",
      Mounting: "B5 flange mounted",
      Cooling: "Finned frame with rear cooling fan",
      Application: applicationSpec,
    },
    imagePath: "/products/ac-motor/three-phase-b5-flange-mounted.webp",
    galleryImages: [
      "/ac-motor/three-phase-motor-blue-2.jpg",
      "/ac-motor/geared-motor-1.jpg",
      "/ac-motor/geared-motor-2.jpg",
      "/ac-motor/motor-exploded-view.jpg",
    ],
    externalUrl: null,
    featured: false,
  },
  {
    slug: "single-phase-ac-induction-motor-b3-foot-mounted",
    name: "Single-Phase AC Induction Motor – B3 Foot Mounted",
    category: "Motors",
    subtitle: "Foot-mounted single-phase induction motor",
    description: `${acMotorDescription} This single-phase version runs from a standard single-phase supply and uses B3 foot mounting for base-plate installation.`,
    features: [
      "B3 foot mounting for base-plate installation",
      "Single-phase AC supply",
      "Suits fans, pumps and light machinery",
      "Simple, durable and reliable design",
      "Relatively low maintenance",
    ],
    specs: {
      Type: "AC induction motor",
      Supply: "Single phase",
      Mounting: "B3 foot mounted",
      Cooling: "Finned frame with rear cooling fan",
      Application: applicationSpec,
    },
    imagePath: "/products/ac-motor/single-phase-b3-foot-mounted.webp",
    galleryImages: ["/ac-motor/motor-exploded-view.jpg"],
    externalUrl: null,
    featured: false,
  },
  {
    slug: "single-phase-ac-induction-motor-b5-flange-mounted",
    name: "Single-Phase AC Induction Motor – B5 Flange Mounted",
    category: "Motors",
    subtitle: "Flange-mounted single-phase induction motor",
    description: `${acMotorDescription} This single-phase version runs from a standard single-phase supply and uses a B5 flange for direct coupling to driven equipment.`,
    features: [
      "B5 flange mounting for direct coupling",
      "Single-phase AC supply",
      "Suits pumps, fans and small gear units",
      "Simple, durable and reliable design",
      "Relatively low maintenance",
    ],
    specs: {
      Type: "AC induction motor",
      Supply: "Single phase",
      Mounting: "B5 flange mounted",
      Cooling: "Finned frame with rear cooling fan",
      Application: applicationSpec,
    },
    imagePath: "/products/ac-motor/single-phase-b5-flange-mounted.webp",
    galleryImages: ["/ac-motor/motor-exploded-view.jpg"],
    externalUrl: null,
    featured: false,
  },
];

/**
 * Product batches added to catalogs that already exist on the server.
 * Each batch is applied once; afterwards administrators can edit or delete
 * the products in /manage without them coming back.
 */
export const catalogSeedBatches: { id: string; products: CreateProductInput[] }[] = [
  { id: "2026-11-ac-induction-motors", products: acMotorProducts },
];
