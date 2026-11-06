import { infoProduct, type ProductInfo } from "./types";

/* Text below is taken from "Pulley.docx". */

const description =
  "A pulley is a mechanical component shaped like a wheel, usually with a groove around its outer edge. It works with a belt, rope or cable to transmit motion and force from one point to another.";

const functions = [
  "Transmit power: Transfers rotational power from a motor to a driven machine through a belt.",
  "Change rotational speed: Different pulley diameters can increase or decrease the driven shaft's speed.",
  "Change the direction of movement: A pulley can guide a belt, rope or cable along a different path.",
  "Support lifting operations: Pulley systems can help lift or move loads when used with suitable ropes or cables.",
  "Maintain belt movement: Properly selected pulleys help a belt run smoothly and efficiently.",
];

const support = [
  "/pulley/support/20200602_150452.jpg",
  "/pulley/support/20210903_133355.jpg",
  "/pulley/support/20210903_143212.jpg",
  "/pulley/support/20210903_145000.jpg",
  "/pulley/support/20221221_184749.jpg",
  "/pulley/support/20221221_184837.jpg",
  "/pulley/support/20221221_185747.jpg",
  "/pulley/support/20221221_185802.jpg",
  "/pulley/support/20221221_185909.jpg",
  "/pulley/support/20221221_185937.jpg",
  "/pulley/support/20221221_185957.jpg",
  "/pulley/support/b8c5f0ce-7d48-413b-abfc-75c5b2843061.jpg",
];

function pulley(name: string, imagePath: string) {
  return infoProduct({
    name,
    category: "Pulleys",
    subtitle: "Pulley",
    description,
    features: functions,
    specs: { Type: name },
    imagePath,
    galleryImages: [],
  });
}

/* Product names are the original picture file names. */
export const pulleyProducts = [
  pulley("Taper Lock Pulley", "/products/pulley/taper-lock-pulley.webp"),
  pulley("Vee Pulley", "/products/pulley/vee-pulley.webp"),
];

export const pulleyInfo: ProductInfo = {
  path: "/pulley",
  title: "Pulley",
  description,
  productGroups: [{ products: pulleyProducts, photos: support }],
  sections: [
    {
      kind: "text",
      paragraphs: [
        "In industrial machinery, pulleys are commonly used to transfer power from an electric motor to another rotating component, such as a fan, pump or conveyor.",
      ],
    },
    { kind: "list", eyebrow: "Main functions of a pulley", items: functions },
    {
      kind: "list",
      eyebrow: "Belt-and-pulley system",
      intro: "A typical industrial belt-and-pulley system works as follows:",
      items: [
        "The electric motor rotates the driving pulley.",
        "The belt transfers motion from the driving pulley to the driven pulley.",
        "The driven pulley rotates and transfers power to the connected machine.",
        "The pulley diameters determine the speed relationship between the two shafts.",
      ],
      paragraphs: [
        "For example, a small motor pulley connected to a larger driven pulley reduces the driven shaft's speed while increasing its available torque, subject to power losses.",
      ],
    },
  ],
};
