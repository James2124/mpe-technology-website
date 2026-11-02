import { infoProduct, type ProductInfo } from "./types";

/* Text below is taken from "Conveyor Roller.docx". */

const description =
  "A conveyor roller is a cylindrical component that rotates to support and move products or materials along a conveyor system.";

const applications = [
  "Warehouses: Move cartons, parcels, and packages.",
  "Manufacturing factories: Transfer products between production stations.",
  "Food and beverage plants: Move packaged products along processing lines.",
  "Packaging systems: Transport boxes for filling, sealing, and labeling.",
  "Logistics centers: Support parcel sorting and distribution.",
  "Heavy industries: Transport pallets, steel products, and other heavy materials using suitably designed rollers.",
];

export const conveyorRollerProducts = [
  infoProduct({
    name: "Conveyor Roller",
    category: "Conveyor Rollers",
    subtitle: "Conveyor Roller",
    description,
    features: applications,
    specs: { Type: "Conveyor Roller" },
    imagePath: "/products/conveyor-roller/20240801_111732.jpg",
    galleryImages: ["/conveyor-roller/support/20240801_105742.jpg", "/conveyor-roller/support/20240801_111742.jpg"],
  }),
];

export const conveyorRollerInfo: ProductInfo = {
  path: "/conveyor-roller",
  title: "Conveyor Roller",
  description,
  productGroups: [
    {
      products: conveyorRollerProducts,
      photos: [
        "/conveyor-roller/support/20230826_104621.jpg",
        "/conveyor-roller/support/20230826_104631.jpg",
        "/conveyor-roller/support/20240801_105106.jpg",
        "/conveyor-roller/support/20240801_105113.jpg",
        "/conveyor-roller/support/20240801_105125.jpg",
        "/conveyor-roller/support/20240801_105149.jpg",
        "/conveyor-roller/support/20240801_105213.jpg",
        "/conveyor-roller/support/20240801_105504.jpg",
        "/conveyor-roller/support/20240801_105645.jpg",
        "/conveyor-roller/support/20240801_105658.jpg",
        "/conveyor-roller/support/20240801_105742.jpg",
        "/conveyor-roller/support/20240801_111732.jpg",
        "/conveyor-roller/support/20240801_111742.jpg",
        "/conveyor-roller/support/20240801_111751.jpg",
        "/conveyor-roller/support/2e1d5f68-cfc5-44f4-8e99-b774724d9aff.jpg",
        "/conveyor-roller/support/354c775e-76e0-463f-bba9-98f2d758e984.jpg",
        "/conveyor-roller/support/4c1ef97e-5bab-4d7f-a801-e6e750cef6dc.jpg",
        "/conveyor-roller/support/4e25c5ea-0b8b-4f9b-a095-d63dca5d5843.jpg",
        "/conveyor-roller/support/533b06a6-a720-4daf-9f5c-363156c056c5.jpg",
        "/conveyor-roller/support/5436c511-fd81-4a7c-b112-b5d8cc3c34d4.jpg",
        "/conveyor-roller/support/66568109-6961-412e-b5f3-a0f8264977b4.jpg",
        "/conveyor-roller/support/6ec72d60-3a55-4fa6-80ba-5b9b086980e1.jpg",
        "/conveyor-roller/support/7e90b0b1-3d1b-4545-ad9d-005a042400be.jpg",
        "/conveyor-roller/support/7f36f3b4-5d44-4895-a383-37ada060af73.jpg",
        "/conveyor-roller/support/8123f283-c2a4-45b9-9646-98de8a7c6413.jpg",
        "/conveyor-roller/support/97df6cff-29f7-4bc7-ab8a-799215c17e8c.jpg",
        "/conveyor-roller/support/IMG-20230228-WA0026.jpg",
        "/conveyor-roller/support/abbf9398-3518-4751-98f8-61e025ab3e2c.jpg",
        "/conveyor-roller/support/af06fbc4-301f-4ad7-8698-7cb2a8ffd1f4.jpg",
        "/conveyor-roller/support/b9c2e052-0466-4bc0-9497-0c142f799250.jpg",
        "/conveyor-roller/support/d92779ed-44eb-42da-ab9c-38c2c1ea59d9.jpg",
        "/conveyor-roller/support/fce707b8-578e-4750-9145-64f08d1caf4f.jpg",
      ],
    },
  ],
  sections: [
    {
      kind: "text",
      paragraphs: [
        "In simple words, a conveyor roller helps boxes, cartons, pallets, and other materials move from one place to another with less friction.",
        "Conveyor rollers are commonly used in factories, warehouses, distribution centers, and production lines.",
      ],
    },
    {
      kind: "list",
      eyebrow: "Applications of conveyor rollers",
      items: applications,
    },
    {
      kind: "groups",
      eyebrow: "Applications of Conveyor Rollers",
      intro: [
        "A conveyor roller is a cylindrical component used to support and move products or materials along a conveyor system. It helps transport items smoothly from one location to another with less friction and manual handling.",
      ],
      subheading: "Common applications of conveyor rollers",
      groups: [
        { title: "Warehousing and logistics", items: ["Move cartons, parcels, and packages.", "Support loading and unloading operations.", "Transfer goods between packing and sorting areas."] },
        { title: "Manufacturing factories", items: ["Transport products between production stations.", "Move components along assembly lines.", "Reduce manual lifting and handling."] },
        { title: "Heavy-duty material handling", items: ["Move pallets and heavy containers.", "Transfer steel products and industrial components.", "Support heavy loads when suitable rollers are selected."] },
        { title: "Food and beverage industry", items: ["Transport packaged food and beverage products.", "Move containers through filling and packaging lines.", "Support hygienic production systems when designed with suitable materials and cleanable components."] },
        { title: "Airport baggage handling", items: ["Move luggage between handling stations.", "Transfer bags toward sorting and loading areas.", "Support baggage handling operations."] },
        { title: "Packaging industry", items: ["Move boxes through sealing and labeling machines.", "Transfer products between packaging stages.", "Support automated production lines."] },
        { title: "Paper and printing industry", items: ["Transport paper sheets and printed products.", "Support paper handling and converting equipment.", "Move materials between processing machines."] },
      ],
    },
  ],
};
