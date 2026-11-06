import { infoProduct, type ProductInfo } from "./types";

/* Text below is taken from "Worm Gear Reducer.docx" (Gearbox folder). */

const description =
  "A worm gear speed reducer is a mechanical device that reduces the rotational speed of a motor while increasing the output torque (turning force).";

const parts = [
  "Worm: A screw-like shaft that rotates when driven by a motor.",
  "Worm wheel: A gear that meshes with the worm and rotates at a lower speed.",
];

const support = [
  "/gearbox/support/20200919_115957.jpg",
  "/gearbox/support/20201113_131021.jpg",
  "/gearbox/support/20201113_131048.jpg",
  "/gearbox/support/20210301_153953.jpg",
  "/gearbox/support/20210301_153956.jpg",
  "/gearbox/support/20210301_155056.jpg",
  "/gearbox/support/20210301_155101.jpg",
  "/gearbox/support/473018886_597355326335626_1086014694302454111_n.jpg",
  "/gearbox/support/473281980_597355483002277_498770356072703946_n.jpg",
];

/* Photos that clearly show this model; models without one show only their product picture. */
export const gearboxGalleries: Record<string, string[]> = {
  WPA: ["/gearbox/support/473018886_597355326335626_1086014694302454111_n.jpg"],
  WPX: [
    "/gearbox/support/20210301_153953.jpg",
    "/gearbox/support/20210301_155056.jpg",
    "/gearbox/support/20210301_155101.jpg",
  ],
};

function gearbox(name: string, imagePath: string) {
  return infoProduct({
    name,
    category: "Gear Reducers",
    subtitle: "Worm Gear Reducer",
    description,
    features: parts,
    specs: { Type: "Worm Gear Reducer", Series: name },
    imagePath,
    galleryImages: gearboxGalleries[name] ?? [],
  });
}

/* Product names are the original picture file names. */
export const gearboxProducts = [
  gearbox("WPA", "/products/gearbox/wpa.webp"),
  gearbox("WPO", "/products/gearbox/wpo.webp"),
  gearbox("WPX", "/products/gearbox/wpx.webp"),
];

export const gearboxInfo: ProductInfo = {
  path: "/gearbox",
  title: "Worm Gear Reducer",
  description,
  productGroups: [{ products: gearboxProducts, photos: support }],
  sections: [
    {
      kind: "list",
      eyebrow: "What is a worm gear speed reducer?",
      intro: "It consists mainly of two parts:",
      items: parts,
      paragraphs: ["These components work together to transfer power between shafts, usually arranged at 90 degrees to each other."],
    },
    {
      kind: "list",
      eyebrow: "The working process",
      intro: "The working process is simple:",
      items: [
        "The motor rotates the worm shaft at high speed.",
        "The worm drives the worm wheel through contact between their teeth.",
        "The worm wheel rotates more slowly than the worm.",
        "The output shaft delivers lower-speed rotation with higher torque.",
      ],
    },
  ],
};
