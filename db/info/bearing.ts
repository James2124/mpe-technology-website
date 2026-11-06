import { infoProduct, type InfoProductGroup, type ProductInfo } from "./types";

/*
 * Text below is taken from "Bearing.docx" and the brand folders'
 * "Bearing description.docx" (the same text for FAG, NTN and SKF).
 */

const description =
  "Bearing is a mechanical component that helps moving parts rotate or move smoothly while reducing friction. Bearings are commonly used in machines, motors, wheels, pumps, conveyors, and many other types of equipment.";

const uses = [
  "Reduce friction between moving parts.",
  "Support rotating shafts and other moving components.",
  "Allow smooth and easy movement.",
  "Reduce wear and tear on machine parts.",
  "Improve machine efficiency and performance.",
  "Help extend the service life of equipment.",
];

/* Photos that clearly show this model; models without one show only their product picture. */
export const bearingGalleries: Record<string, string[]> = {
  "FAG 6000 SERIES": [
    "/bearing/fag/WhatsApp-Image-2022-06-11-at-10-07-31-AM.jpg",
    "/bearing/fag/WhatsApp-Image-2022-06-13-at-1-59-53-PM-2.jpg",
    "/bearing/fag/WhatsApp-Image-2022-06-13-at-1-59-54-PM.jpg",
  ],
  "FAG UCF": ["/bearing/fag/WhatsApp-Image-2022-06-11-at-10-07-30-AM-1.jpg"],
  "NTN 6000 SERIES": [
    "/bearing/ntn/WhatsApp-Image-2022-12-05-at-11-34-31-1.jpg",
    "/bearing/ntn/WhatsApp-Image-2022-12-05-at-11-34-31.jpg",
  ],
  "NTN UCF": ["/bearing/ntn/20191010_082113.jpg"],
  "SKF 6000 SERIES": [
    "/bearing/skf/20220618_111237.jpg",
    "/bearing/skf/476251962_617212877683204_6657178825022925241_n.jpg",
    "/bearing/skf/476789639_617212867683205_4003496069289587150_n.jpg",
    "/bearing/skf/476871608_617213137683178_1592727698233665954_n.jpg",
  ],
};

function bearing(name: string, brand: string, series: string, imagePath: string) {
  return infoProduct({
    name,
    category: "Bearings",
    subtitle: `${brand} Bearing`,
    description,
    features: uses,
    specs: { Brand: brand, Series: series },
    imagePath,
    galleryImages: bearingGalleries[name] ?? [],
  });
}

const productGroups: InfoProductGroup[] = [
  {
      title: "FAG",
      logo: { src: "/bearing/ina-fag.png", alt: "INA FAG" },
      products: [
        bearing("FAG 6000 SERIES", "FAG", "6000 SERIES", "/products/bearing/fag-6000-series.webp"),
        bearing("FAG UCF", "FAG", "UCF", "/products/bearing/fag-ucf.webp"),
        bearing("FAG UCP", "FAG", "UCP", "/products/bearing/fag-ucp.webp"),
        bearing("FAG UCT", "FAG", "UCT", "/products/bearing/fag-uct.webp"),
      ],
      photos: [
        "/bearing/fag/20200703_114732.jpg",
        "/bearing/fag/20200703_114754.jpg",
        "/bearing/fag/WhatsApp-Image-2022-06-11-at-10-07-30-AM-1.jpg",
        "/bearing/fag/WhatsApp-Image-2022-06-11-at-10-07-31-AM.jpg",
        "/bearing/fag/WhatsApp-Image-2022-06-13-at-1-59-53-PM-2.jpg",
        "/bearing/fag/WhatsApp-Image-2022-06-13-at-1-59-54-PM.jpg",
        "/bearing/fag/WhatsApp-Image-2022-06-13-at-1-59-56-PM-2.jpg",
        "/bearing/fag/WhatsApp-Image-2022-06-13-at-1-59-57-PM-1.jpg",
        "/bearing/fag/WhatsApp-Image-2022-06-13-at-1-59-58-PM-3.jpg",
        "/bearing/fag/WhatsApp-Image-2022-06-13-at-1-59-59-PM-1.jpg",
        "/bearing/fag/WhatsApp-Image-2022-06-13-at-1-59-59-PM-2.jpg",
        "/bearing/fag/WhatsApp-Image-2022-06-13-at-1-59-59-PM.jpg",
        "/bearing/fag/WhatsApp-Image-2022-06-13-at-2-00-00-PM.jpg",
        "/bearing/fag/WhatsApp-Image-2022-06-13-at-2-00-13-PM.jpg",
      ],
    },
  {
    title: "NTN",
      logo: { src: "/bearing/ntn-logo.png", alt: "NTN" },
      products: [
        bearing("NTN 6000 SERIES", "NTN", "6000 SERIES", "/products/bearing/ntn-6000-series.webp"),
        bearing("NTN UCF", "NTN", "UCF", "/products/bearing/ntn-ucf.webp"),
        bearing("NTN UCP", "NTN", "UCP", "/products/bearing/ntn-ucp.webp"),
      ],
      photos: [
        "/bearing/ntn/20191010_082113.jpg",
        "/bearing/ntn/20200520_111955.jpg",
        "/bearing/ntn/20201005_125758.jpg",
        "/bearing/ntn/20201005_131639.jpg",
        "/bearing/ntn/20221005_152302.jpg",
        "/bearing/ntn/20221005_152306.jpg",
        "/bearing/ntn/20221005_153344.jpg",
        "/bearing/ntn/20221005_153346.jpg",
        "/bearing/ntn/20221014_144808.jpg",
        "/bearing/ntn/20221014_144824.jpg",
        "/bearing/ntn/WhatsApp-Image-2022-12-05-at-11-34-31-1.jpg",
        "/bearing/ntn/WhatsApp-Image-2022-12-05-at-11-34-31.jpg",
      ],
    },
  {
    title: "SKF",
      logo: { src: "/bearing/skf.png", alt: "SKF" },
      products: [
        bearing("SKF 6000 SERIES", "SKF", "6000 SERIES", "/products/bearing/skf-6000-series.webp"),
        bearing("SKF UCF", "SKF", "UCF", "/products/bearing/skf-ucf.webp"),
        bearing("SKF UCP", "SKF", "UCP", "/products/bearing/skf-ucp.webp"),
        bearing("SKF UCT", "SKF", "UCT", "/products/bearing/skf-uct.webp"),
      ],
      photos: [
        "/bearing/skf/20220319_114749.jpg",
        "/bearing/skf/20220319_115804.jpg",
        "/bearing/skf/20220402_103906.jpg",
        "/bearing/skf/20220419_110257.jpg",
        "/bearing/skf/20220419_110303.jpg",
        "/bearing/skf/20220607_135309.jpg",
        "/bearing/skf/20220607_135316.jpg",
        "/bearing/skf/20220618_111237.jpg",
        "/bearing/skf/20220618_111418.jpg",
        "/bearing/skf/20220618_111444.jpg",
        "/bearing/skf/20221221_184749.jpg",
        "/bearing/skf/20221221_185909.jpg",
        "/bearing/skf/20221221_185937.jpg",
        "/bearing/skf/20221221_185957.jpg",
        "/bearing/skf/20231107_112229.jpg",
        "/bearing/skf/20231218_101921.jpg",
        "/bearing/skf/20231218_101925.jpg",
        "/bearing/skf/20231218_102137.jpg",
        "/bearing/skf/20231218_102149.jpg",
        "/bearing/skf/476251962_617212877683204_6657178825022925241_n.jpg",
        "/bearing/skf/476789639_617212867683205_4003496069289587150_n.jpg",
        "/bearing/skf/476871608_617213137683178_1592727698233665954_n.jpg",
      ],
    },
];

export const bearingProducts = productGroups.flatMap((group) => group.products);

export const bearingInfo: ProductInfo = {
  path: "/bearing",
  title: "Bearing",
  description,
  productGroups,
  sections: [
    {
      kind: "list",
      eyebrow: "The used of bearing",
      intro: "The main purpose of a bearing is to:",
      items: uses,
      paragraphs: [
        "For example, in an electric motor, bearings support the motor shaft and allow it to rotate smoothly. In a vehicle wheel, bearings allow the wheel to turn with less friction.",
        "Simply put: A bearing helps machine parts move smoothly, efficiently, and reliably.",
      ],
    },
    {
      kind: "text",
      eyebrow: "Bearing",
      paragraphs: [
        "A bearing is a mechanical component that supports a rotating shaft and helps it rotate smoothly with less friction.",
        "In simple words, a bearing helps a shaft spin easily while supporting its load.",
      ],
    },
    {
      kind: "list",
      eyebrow: "Main functions of a bearing",
      items: [
        "Reduce friction: Helps rotating parts move smoothly.",
        "Support loads: Carries the weight or force acting on a shaft.",
        "Maintain alignment: Keeps the shaft in the correct position.",
        "Reduce wear: Helps prevent damage to moving machine parts.",
      ],
    },
    {
      kind: "list",
      eyebrow: "If a bearing is damaged",
      intro: "If a bearing is damaged, you may notice:",
      items: ["Unusual noise", "Excessive vibration", "High temperature", "Rough shaft rotation"],
      paragraphs: ["Important: Proper lubrication, correct installation, and regular inspection help extend bearing life."],
    },
    {
      kind: "groups",
      eyebrow: "Applications of Bearings",
      intro: [
        "A bearing is used in machines to support rotating parts, reduce friction, and help shafts rotate smoothly. Bearings are widely used in industrial equipment, vehicles, household appliances, and many other machines.",
      ],
      subheading: "Common applications of bearings",
      groups: [
        { title: "Electric motors", items: ["Support the motor shaft.", "Allow the rotor to rotate smoothly.", "Reduce friction and wear."] },
        { title: "Pumps", items: ["Support the rotating shaft.", "Help maintain shaft alignment.", "Handle forces generated during operation."] },
        { title: "Gearboxes", items: ["Support rotating gears and shafts.", "Carry radial and axial loads.", "Help maintain smooth power transmission."] },
        { title: "Conveyor systems", items: ["Support conveyor rollers and pulleys.", "Allow rollers to rotate easily.", "Help transport materials efficiently."] },
        { title: "Vehicles", items: ["Support vehicle wheels.", "Allow wheels to rotate smoothly.", "Carry vehicle weight and driving forces."] },
        { title: "Agitators and mixers", items: ["Support the rotating agitator shaft.", "Help maintain shaft alignment.", "Carry loads generated during mixing."] },
        { title: "Household appliances", items: ["Support washing machine drums.", "Help fans rotate smoothly.", "Reduce friction in rotating components."] },
      ],
    },
  ],
};
