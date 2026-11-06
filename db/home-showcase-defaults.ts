import type { HomeShowcase } from "../app/lib/types";

/** Shown until an administrator saves changes in /manage/homepage. */
export const defaultHomeShowcase: HomeShowcase = {
  feature: {
    title: "AC INDUCTION MOTOR",
    text: "An AC Induction Motor is an electric motor that converts electrical energy into mechanical energy to make machines and equipment rotate.",
    imagePath: "/products/ac-motor/three-phase-b5-flange-mounted.webp",
    href: "/ac-induction-motor",
    buttonLabel: "View more",
  },
  cards: [
    { id: "agitator", title: "Agitator", imagePath: "/products/agitator/agitator.webp", href: "/agitator" },
    { id: "bearing", title: "Bearing", imagePath: "/products/bearing/skf-6000-series.webp", href: "/bearing" },
    { id: "belting", title: "Belting", imagePath: "/products/belting/belt-image.webp", href: "/belting" },
    { id: "chain-sprocket", title: "Chain Sprocket", imagePath: "/products/chain-sprocket/chain-sprocket.webp", href: "/chain-sprocket" },
    { id: "conveyor-roller", title: "Conveyor Roller", imagePath: "/products/conveyor-roller/20240801_111732.jpg", href: "/conveyor-roller" },
    { id: "conveyor-sprocket", title: "Conveyor Sprocket", imagePath: "/products/conveyor-sprocket/95e99121-6e03-4897-96da-8bedaecbe568.jpg", href: "/conveyor-sprocket" },
    { id: "coupling", title: "Coupling", imagePath: "/products/coupling/fcl-coupling.webp", href: "/coupling" },
    { id: "gearbox", title: "Worm Gear Reducer", imagePath: "/products/gearbox/wpa.webp", href: "/gearbox" },
    { id: "oil-lubrication", title: "Oil Lubrication", imagePath: "/products/oil-lubrication/20220509_131258.jpg", href: "/oil-lubrication" },
    { id: "pulley", title: "Pulley", imagePath: "/products/pulley/taper-lock-pulley.webp", href: "/pulley" },
    { id: "roller-chain", title: "Roller Chain", imagePath: "/products/roller-chain/roller-chain.jpg", href: "/roller-chain" },
    { id: "water-pump", title: "Water Pump", imagePath: "/products/water-pump/automatic-self-priming-pumps.webp", href: "/water-pump" },
    { id: "blower-fan", title: "Blower Fan", imagePath: "/products/blower-fan/blower-fan.webp", href: "/blower-fan" },
  ],
};

/** Pages offered as link suggestions in the admin form. */
export const homeShowcaseLinkSuggestions = [
  "/ac-induction-motor", "/agitator", "/bearing", "/belting", "/blower-fan", "/chain-sprocket",
  "/conveyor-roller", "/conveyor-sprocket", "/coupling", "/gearbox", "/oil-lubrication",
  "/pulley", "/roller-chain", "/water-pump", "/products", "/services", "/customize", "/contact",
];
