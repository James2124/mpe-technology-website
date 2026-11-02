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
    {
      kind: "groups",
      eyebrow: "Applications of Roller Chain",
      intro: [
        "A roller chain is a mechanical component used to transmit power and motion between rotating shafts. It works with toothed wheels called sprockets and is widely used in industrial machinery, conveyors, vehicles and agricultural equipment.",
      ],
      subheading: "Common applications of roller chains",
      groups: [
        { title: "Conveyor systems", items: ["Transfers power from a motor to a conveyor shaft.", "Moves products and materials along production lines.", "Used in factories, warehouses and packaging facilities."] },
        { title: "Packaging machines", items: ["Drives moving parts in filling and wrapping machines.", "Helps synchronize machine movements.", "Supports continuous production operations."] },
        { title: "Motorcycles and bicycles", items: ["Transfers rotational power from the front sprocket to the rear sprocket.", "Drives the rear wheel to move the vehicle.", "Provides efficient mechanical power transmission when properly maintained."] },
        { title: "Agricultural machinery", items: ["Drives components in harvesters, seeders and other farming machines.", "Transfers power to moving mechanisms.", "Operates in demanding working environments."] },
        { title: "Industrial machinery", items: ["Transfers power between rotating shafts.", "Used in manufacturing and material-handling equipment.", "Maintains a fixed speed ratio when the chain engages correctly with the sprockets."] },
        { title: "Material-handling equipment", items: ["Drives bucket elevators and certain lifting or conveying mechanisms.", "Moves bulk materials such as grain and other industrial products.", "Requires a chain specifically rated for the load and operating conditions."] },
      ],
    },
  ],
};
