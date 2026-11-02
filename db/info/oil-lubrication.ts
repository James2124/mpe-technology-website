import { infoProduct, type ProductInfo } from "./types";

/* Text below is taken from "Oil Lubrication.docx" (Oil Lubricate folder). */

const description =
  "Oil lubrication is the process of applying oil between moving mechanical parts to reduce friction, wear and heat during operation.";

const paragraphs = [
  "In a worm gear speed reducer, oil forms a thin protective film between the worm shaft and the worm wheel. This helps the gears operate smoothly and protects them from excessive wear.",
  "Oil lubrication is important because worm gears have considerable sliding contact between their teeth, which can generate heat and friction.",
];

const process = [
  "Oil is added to the gearbox through the designated filling port.",
  "The worm wheel or worm shaft rotates, depending on the gearbox design.",
  "Oil is carried to the contact surfaces by gear movement, splashing or other designed lubrication methods.",
  "An oil film forms between the worm and worm wheel.",
  "Heat and wear are controlled while the gearbox operates.",
];

const closing =
  "Many small worm gear reducers use an oil-bath or splash-lubrication system. Larger or specialized units may use other lubrication arrangements.";

export const oilLubricationProducts = [
  infoProduct({
    name: "Oil Lubrication",
    category: "Lubrication",
    subtitle: "Oil Lubrication",
    description: [description, ...paragraphs].join(" "),
    features: [],
    specs: { Type: "Oil Lubrication" },
    imagePath: "/products/oil-lubrication/20220509_131258.jpg",
    galleryImages: ["/products/oil-lubrication/20220902_102019.jpg"],
  }),
];

export const oilLubricationInfo: ProductInfo = {
  path: "/oil-lubrication",
  title: "Oil Lubrication",
  description,
  productGroups: [
    {
      products: oilLubricationProducts,
      photos: [
        "/oil-lubrication/support/20220509_122400.jpg",
        "/oil-lubrication/support/20220509_122430.jpg",
        "/oil-lubrication/support/20220509_122447.jpg",
        "/oil-lubrication/support/20220509_125036.jpg",
        "/oil-lubrication/support/20220509_125114.jpg",
        "/oil-lubrication/support/20220509_125230.jpg",
        "/oil-lubrication/support/20220509_125259.jpg",
        "/oil-lubrication/support/20220509_131258.jpg",
        "/oil-lubrication/support/20220509_131309.jpg",
        "/oil-lubrication/support/20220509_131344.jpg",
        "/oil-lubrication/support/20220509_131408.jpg",
        "/oil-lubrication/support/20220509_131425.jpg",
        "/oil-lubrication/support/Screenshot_20220326-155104_WhatsApp.jpg",
        "/oil-lubrication/support/Screenshot_20220326-155145_WhatsApp.jpg",
        "/oil-lubrication/support/Screenshot_20220326-155330_WhatsApp.jpg",
        "/oil-lubrication/support/Screenshot_20220326-155431_WhatsApp.jpg",
        "/oil-lubrication/support/Screenshot_20220326-155448_WhatsApp.jpg",
      ],
    },
  ],
  sections: [
    { kind: "text", paragraphs },
    {
      kind: "list",
      eyebrow: "How it works",
      intro: "The process generally works as follows:",
      items: process,
      paragraphs: [closing],
    },
  ],
};
