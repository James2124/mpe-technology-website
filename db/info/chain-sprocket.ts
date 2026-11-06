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
  sections: [
    {
      kind: "text",
      paragraphs: [
        "In simple words, the sprocket teeth engage with the chain links, allowing the motor's rotation to drive another machine or component.",
        "Chain sprockets are commonly used in industrial machinery, conveyors, motorcycles, bicycles, and material-handling equipment.",
      ],
    },
    {
      kind: "groups",
      eyebrow: "Main parts of a chain sprocket system",
      groups: [
        { title: "Sprocket", items: ["A toothed wheel that engages with the chain and transfers rotational movement."] },
        { title: "Chain", items: ["A series of connected metal links that engages with the sprocket teeth to transmit power."] },
        { title: "Driving and driven sprockets", items: ["The driving sprocket receives power from the motor or gearbox. The driven sprocket transfers that movement to the connected machine."] },
      ],
      paragraphs: [
        "For example, an electric motor rotates a small sprocket. The chain transfers the movement to a larger sprocket connected to a conveyor.",
        "A larger driven sprocket generally produces lower speed and higher torque.",
        "A smaller driven sprocket generally produces higher speed and lower torque.",
        "These effects assume the same chain speed and ideal transmission, before losses.",
      ],
    },

    {
      kind: "list",
      eyebrow: "Advantages of chain sprockets",
      items: advantages,
    },
  ],
};
