import { infoProduct, type ProductInfo } from "./types";

/* Text below is taken from "Water Pump.docx". */

const description =
  "A water pump is a mechanical device used to move water from one location to another by creating a pressure difference or adding energy to the water.";

const applications = [
  "Residential buildings: Supply water to taps, showers and storage tanks.",
  "Industrial factories: Transfer water for production processes and equipment.",
  "Cooling systems: Circulate water through chillers, heat exchangers and cooling towers.",
  "Agriculture: Supply water for irrigation and farming.",
  "Drainage: Remove unwanted water from basements, construction sites and flooded areas.",
  "Water treatment: Move water through filtration and treatment stages.",
  "Fire protection: Supply water to fire-protection systems using appropriately designed fire pumps.",
];

function pump(name: string, imagePath: string, galleryImages: string[]) {
  return infoProduct({
    name,
    category: "Pumps",
    subtitle: "Water Pump",
    description,
    features: applications,
    specs: { Type: name },
    imagePath,
    galleryImages,
  });
}

/* Product names are the original picture file names; numbered pictures are extra views. */
export const waterPumpProducts = [
  pump("Automatic Self Priming Pumps", "/products/water-pump/automatic-self-priming-pumps.webp", ["/products/water-pump/automatic-self-priming-pumps-2.webp", "/products/water-pump/automatic-self-priming-pumps-3.webp", "/products/water-pump/automatic-self-priming-pumps-4.webp"]),
  pump("Centrifugal Water Pump", "/products/water-pump/centrifugal-water-pump.webp", []),
  pump("Stainless Steel Multi-stage centrifugal pumps", "/products/water-pump/stainless-steel-multi-stage-centrifugal-pumps.webp", ["/products/water-pump/stainless-steel-multi-stage-centrifugal-pumps-2.webp", "/products/water-pump/stainless-steel-multi-stage-centrifugal-pumps-3.webp", "/products/water-pump/stainless-steel-multi-stage-centrifugal-pumps-4.webp"]),
  pump("Stainless Steel pump", "/products/water-pump/stainless-steel-pump.webp", []),
  pump("Submersible pump", "/products/water-pump/submersible-pump.webp", ["/products/water-pump/submersible-pump-2.webp", "/products/water-pump/submersible-pump-3.webp", "/products/water-pump/submersible-pump-4.webp", "/products/water-pump/submersible-pump-5.webp"]),
  pump("Surface Pump", "/products/water-pump/surface-pump.webp", ["/products/water-pump/surface-pump-2.webp", "/products/water-pump/surface-pump-3.webp"]),
];

export const waterPumpInfo: ProductInfo = {
  path: "/water-pump",
  title: "Water Pump",
  description,
  productGroups: [
    {
      products: waterPumpProducts,
      photos: [
        "/water-pump/support/20200930_184021.jpg",
        "/water-pump/support/20220222_094718.jpg",
        "/water-pump/support/20220222_094728.jpg",
        "/water-pump/support/20251001_211942.jpg",
        "/water-pump/support/20251001_212011.jpg",
        "/water-pump/support/20251001_214009.jpg",
        "/water-pump/support/20251104_143559.jpg",
      ],
    },
  ],
  sections: [
    {
      kind: "text",
      paragraphs: [
        "Water pumps are commonly used in homes, factories, buildings, farms and water treatment plants. They can supply water, circulate water through pipes, drain flooded areas and support industrial processes.",
      ],
    },
    {
      kind: "list",
      eyebrow: "The working process",
      intro: "The working process is simple:",
      items: [
        "Motor starts: An electric motor supplies rotational power to the pump.",
        "Impeller rotates: The impeller spins inside the pump casing.",
        "Water enters: Water flows into the pump through the suction inlet.",
        "Water gains energy: The rotating impeller transfers energy to the water, increasing its pressure and velocity.",
        "Water exits: The water leaves through the discharge outlet and flows into the piping system.",
      ],
      paragraphs: [
        "Note: Different pump designs work differently. A centrifugal pump generally needs to be properly primed unless it is designed to be self-priming or submerged.",
      ],
    },
    { kind: "list", eyebrow: "Applications of water pumps", items: applications },
    {
      kind: "groups",
      eyebrow: "Applications of Water Pumps",
      intro: [
        "A water pump is a mechanical device used to transfer water from one location to another by providing the pressure and flow needed for a particular application. Water pumps are widely used in homes, factories, agriculture and commercial buildings.",
      ],
      subheading: "Common applications of water pumps",
      groups: [
        { title: "Domestic water supply", items: ["Pumps water from storage tanks to taps and showers.", "Supplies water to multi-storey buildings.", "Maintains suitable water pressure for household use."] },
        { title: "Industrial factories", items: ["Transfers water between storage tanks and production equipment.", "Supplies process water to manufacturing systems.", "Supports industrial cleaning and cooling operations."] },
        { title: "Agriculture and irrigation", items: ["Supplies water to crops and plantations.", "Transfers water from rivers, reservoirs or wells.", "Supports sprinkler and drip-irrigation systems."] },
        { title: "Cooling and air-conditioning systems", items: ["Circulates chilled water through air-conditioning systems.", "Moves water through heat exchangers and cooling towers.", "Helps remove unwanted heat from machinery and buildings."] },
        { title: "Drainage and flood control", items: ["Removes accumulated water from flooded areas.", "Drains basements, construction sites and underground spaces.", "Helps control unwanted water accumulation."] },
        { title: "Water treatment plants", items: ["Transfers water through filtration and treatment processes.", "Moves treated water into storage tanks and distribution networks.", "Supports wastewater treatment operations with suitable pump designs."] },
        { title: "Fire protection systems", items: ["Supplies water to firefighting sprinkler and hydrant systems.", "Provides the required flow and pressure during a fire.", "Uses specially designed fire pumps that meet applicable standards."] },
      ],
    },
    {
      kind: "list",
      eyebrow: "Other applications",
      items: [
        "Swimming pools: Circulates water through filters and treatment equipment.",
        "Fountains and water features: Creates water movement and decorative sprays.",
        "Boiler systems: Supplies feedwater using pumps designed for the required pressure and temperature.",
        "Aquaculture: Circulates water in fish farms and aquatic systems.",
        "Mining: Dewaters mines and transfers process water using suitable heavy-duty pumps.",
      ],
    },
  ],
};
