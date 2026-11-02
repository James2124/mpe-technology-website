import { infoProduct, type ProductInfo } from "./types";

/* Text below is taken from "Conveyor Sprocket.docx". */

const description =
  "A conveyor sprocket is a toothed wheel that engages with a chain to transfer power and movement in a conveyor system.";

const paragraphs = [
  "In simple words, a conveyor sprocket helps drive the conveyor chain or rollers so that products and materials can move from one place to another.",
  "It is commonly used in factories, warehouses, packaging lines, and heavy-duty material-handling systems.",
];

export const conveyorSprocketProducts = [
  infoProduct({
    name: "Conveyor Sprocket",
    category: "Sprockets",
    subtitle: "Conveyor Sprocket",
    description: [description, ...paragraphs].join(" "),
    features: [],
    specs: { Type: "Conveyor Sprocket" },
    imagePath: "/products/conveyor-sprocket/95e99121-6e03-4897-96da-8bedaecbe568.jpg",
    galleryImages: ["/conveyor-sprocket/support/20211119_170554.jpg", "/conveyor-sprocket/support/20211216_170951.jpg", "/conveyor-sprocket/support/20220704_161630.jpg", "/conveyor-sprocket/support/20260211_171209.jpg"],
  }),
];

export const conveyorSprocketInfo: ProductInfo = {
  path: "/conveyor-sprocket",
  title: "Conveyor Sprocket",
  description,
  productGroups: [
    {
      products: conveyorSprocketProducts,
      photos: [
        "/conveyor-sprocket/support/20200520_164457.jpg",
        "/conveyor-sprocket/support/20200520_164620.jpg",
        "/conveyor-sprocket/support/20200609_171258.jpg",
        "/conveyor-sprocket/support/20200924_121649.jpg",
        "/conveyor-sprocket/support/20211119_170541.jpg",
        "/conveyor-sprocket/support/20211119_170547.jpg",
        "/conveyor-sprocket/support/20211119_170554.jpg",
        "/conveyor-sprocket/support/20211119_170557.jpg",
        "/conveyor-sprocket/support/20211210_083915.jpg",
        "/conveyor-sprocket/support/20211210_083926.jpg",
        "/conveyor-sprocket/support/20211210_084032.jpg",
        "/conveyor-sprocket/support/20211211_093928.jpg",
        "/conveyor-sprocket/support/20211216_170951.jpg",
        "/conveyor-sprocket/support/20211216_170957.jpg",
        "/conveyor-sprocket/support/20211216_171041.jpg",
        "/conveyor-sprocket/support/20211216_171044.jpg",
        "/conveyor-sprocket/support/20211217_142235.jpg",
        "/conveyor-sprocket/support/20211217_142242.jpg",
        "/conveyor-sprocket/support/20211221_162752.jpg",
        "/conveyor-sprocket/support/20211221_162816.jpg",
        "/conveyor-sprocket/support/20211224_100358.jpg",
        "/conveyor-sprocket/support/20211224_100407.jpg",
        "/conveyor-sprocket/support/20211224_100415.jpg",
        "/conveyor-sprocket/support/20211227_104821.jpg",
        "/conveyor-sprocket/support/20211227_104827.jpg",
        "/conveyor-sprocket/support/20220106_114509.jpg",
        "/conveyor-sprocket/support/20220106_114522.jpg",
        "/conveyor-sprocket/support/20220704_161630.jpg",
        "/conveyor-sprocket/support/20220704_161646.jpg",
        "/conveyor-sprocket/support/20221026_144638.jpg",
        "/conveyor-sprocket/support/20230117_111904.jpg",
        "/conveyor-sprocket/support/20230224_113909.jpg",
        "/conveyor-sprocket/support/20230224_145826.jpg",
        "/conveyor-sprocket/support/20230814_144021.jpg",
        "/conveyor-sprocket/support/20231020_101817.jpg",
        "/conveyor-sprocket/support/20260130_162634.jpg",
        "/conveyor-sprocket/support/20260130_162637.jpg",
        "/conveyor-sprocket/support/20260210_143400.jpg",
        "/conveyor-sprocket/support/20260211_171117.jpg",
        "/conveyor-sprocket/support/20260211_171125.jpg",
        "/conveyor-sprocket/support/20260211_171131.jpg",
        "/conveyor-sprocket/support/20260211_171137.jpg",
        "/conveyor-sprocket/support/20260211_171209.jpg",
        "/conveyor-sprocket/support/20260211_171217.jpg",
        "/conveyor-sprocket/support/20260211_171226.jpg",
        "/conveyor-sprocket/support/20260213_093815.jpg",
        "/conveyor-sprocket/support/20260213_093842.jpg",
        "/conveyor-sprocket/support/20260213_093852.jpg",
        "/conveyor-sprocket/support/20260213_093906.jpg",
        "/conveyor-sprocket/support/24d9c0a7-a1d5-45e8-88c6-5ca955dcdf3d.jpg",
        "/conveyor-sprocket/support/IMG-20230403-WA0034.jpg",
        "/conveyor-sprocket/support/Screenshot_20260211_162213_WhatsApp.jpg",
        "/conveyor-sprocket/support/Screenshot_20260211_163808_Gallery.jpg",
        "/conveyor-sprocket/support/Screenshot_20260213_101533_Gallery.jpg",
        "/conveyor-sprocket/support/e9e37e8d-cbf1-40d5-ac46-0b9db4065c4c.jpg",
      ],
    },
  ],
  sections: [
    { kind: "text", paragraphs },
  ],
};
