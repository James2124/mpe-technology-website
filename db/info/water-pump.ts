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

  ],
};
