import { infoProduct, type ProductInfo } from "./types";

/* Text below is taken from "Oil Lubrication.docx" (Oil Lubricate folder). */

const description =
  "Oil lubrication is the process of applying oil between moving mechanical parts to reduce friction, wear and heat during operation.";

export const oilLubricationProducts = [
  infoProduct({
    name: "Oil Lubrication",
    category: "Lubrication",
    subtitle: "Oil Lubrication",
    description,
    features: [],
    specs: { Type: "Oil Lubrication" },
    imagePath: "/products/oil-lubrication/20220509_131258.webp",
    galleryImages: ["/products/oil-lubrication/20220902_102019.webp"],
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
  sections: [],
};
