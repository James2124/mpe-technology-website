import { infoProduct, type ProductInfo } from "./types";

/* Text below is taken from "Chain Sprocket.docx". */

const description =
  "A chain sprocket is a toothed wheel that works together with a chain to transfer mechanical power from one rotating shaft to another.";

const advantages = [
  "Provide positive power transmission with little slip under normal operating conditions.",
  "Can transfer power between shafts separated by a distance.",
  "Suitable for many industrial loads.",
  "Allow speed changes by using different sprocket sizes.",
  "Can be maintained by inspecting and lubricating the chain as required.",
];

export const chainSprocketProducts = [
  infoProduct({
    name: "Chain Sprocket",
    category: "Sprockets",
    subtitle: "Chain Sprocket",
    description,
    features: advantages,
    specs: { Type: "Chain Sprocket" },
    imagePath: "/products/chain-sprocket/chain-sprocket.webp",
    galleryImages: ["/chain-sprocket/support/20200620_105558.jpg", "/chain-sprocket/support/20200919_121502.jpg", "/chain-sprocket/support/20220217_113750.jpg", "/chain-sprocket/support/20220804_095107.jpg"],
  }),
];

export const chainSprocketInfo: ProductInfo = {
  path: "/chain-sprocket",
  title: "Chain Sprocket",
  description,
  productGroups: [
    {
      products: chainSprocketProducts,
      photos: [
        "/chain-sprocket/support/20200620_105558.jpg",
        "/chain-sprocket/support/20200919_121502.jpg",
        "/chain-sprocket/support/20220217_113750.jpg",
        "/chain-sprocket/support/20220804_095107.jpg",
        "/chain-sprocket/support/20230505_151928.jpg",
        "/chain-sprocket/support/20250320_113320.jpg",
        "/chain-sprocket/support/20251215_164115.jpg",
      ],
    },
  ],
  sections: [],
};
