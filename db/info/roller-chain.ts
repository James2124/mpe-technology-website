import { infoProduct, type ProductInfo } from "./types";

/* Text below is taken from "Roller Chain.docx". */

const description =
  "A roller chain is a mechanical component made of connected metal links that transmit power and rotational motion from one shaft to another.";

export const rollerChainProducts = [
  infoProduct({
    name: "Roller Chain",
    category: "Roller Chains",
    subtitle: "Roller Chain",
    description,
    features: [],
    specs: { Type: "Roller Chain" },
    imagePath: "/products/roller-chain/roller-chain.jpg",
    galleryImages: ["/roller-chain/support/20250312_162000.jpg", "/roller-chain/support/20250312_162558.jpg", "/roller-chain/support/20250319_100413.jpg", "/roller-chain/support/20250319_100428.jpg"],
  }),
];

export const rollerChainInfo: ProductInfo = {
  path: "/roller-chain",
  title: "Roller Chain",
  description,
  productGroups: [
    {
      products: rollerChainProducts,
      photos: [
        "/roller-chain/support/20250312_162000.jpg",
        "/roller-chain/support/20250312_162558.jpg",
        "/roller-chain/support/20250319_100413.jpg",
        "/roller-chain/support/20250319_100428.jpg",
        "/roller-chain/support/20250319_100435.jpg",
      ],
    },
  ],
  sections: [
    {
      kind: "text",
      paragraphs: [
        "It normally works together with toothed wheels called sprockets. When the driving sprocket rotates, its teeth engage with the chain rollers and pull the chain, causing the driven sprocket to rotate.",
        "Roller chains are commonly used in industrial machinery because they can transmit relatively high loads without the slipping associated with friction-based belt drives.",
      ],
    },
    {
      kind: "list",
      eyebrow: "The working process",
      intro: "The working process is simple:",
      items: [
        "The motor rotates the driving sprocket.",
        "The sprocket teeth engage with the roller chain.",
        "The moving chain transfers mechanical power to the driven sprocket.",
        "The driven sprocket rotates the connected shaft or machine component.",
      ],
      paragraphs: [
        "Unlike a belt drive, a properly engaged roller chain drive provides a fixed speed ratio with minimal transmission slip.",
      ],
    },
  ],
};
