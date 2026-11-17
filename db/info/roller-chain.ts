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
  sections: [],
};
