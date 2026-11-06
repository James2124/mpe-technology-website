import { infoProduct, type ProductInfo } from "./types";

/* Text below is taken from "Belting Description.docx". */

const description =
  "Belting is a flexible belt used to transfer power, movement, or materials between rotating components in machinery and equipment. It is commonly used together with pulleys to transmit motion from a motor or drive system to another component.";

const uses = [
  "Transmitting power between motors, pulleys, and rotating machinery",
  "Driving industrial equipment and machinery",
  "Conveying or transporting materials in conveyor systems",
  "Replacing worn or damaged belts in machines",
  "Supporting smooth and continuous machine operation",
];

export const beltingProducts = [
  infoProduct({
    name: "Belting",
    category: "Belting",
    subtitle: "Belting",
    description,
    features: uses,
    specs: { Type: "Belting", Section: "A / B / C" },
    imagePath: "/products/belting/belt-image.webp",
    galleryImages: [
      "/belting/description/v-belt.png",
      "/belting/description/belt-description.png",
      ...["/belting/support/20211103_144736.jpg", "/belting/support/20211103_145149.jpg", "/belting/support/20211103_155027.jpg"],
    ],
  }),
];

export const beltingInfo: ProductInfo = {
  path: "/belting",
  title: "Belting",
  description,
  productGroups: [
    {
      products: beltingProducts,
      photos: [
        "/belting/support/20211103_144736.jpg",
        "/belting/support/20211103_145149.jpg",
        "/belting/support/20211103_155027.jpg",
      ],
    },
  ],
  sections: [
    { kind: "text", paragraphs: ["In simple terms: Belting acts as a flexible connection between rotating components, helping machines transfer power or move materials efficiently."] },
    {
      kind: "images",
      eyebrow: "Belt description",
      images: [
        { src: "/belting/description/v-belt.png", alt: "V-belt" },
        { src: "/belting/description/belt-description.png", alt: "Belt description" },
        { src: "/belting/description/belt-description-2.png", alt: "The main V-belt components" },
        { src: "/belting/description/a-belt.png", alt: "A belt" },
        { src: "/belting/description/b-belt.png", alt: "B belt" },
        { src: "/belting/description/c-belt.png", alt: "C belt" },
      ],
    },
  ],
};
