import { infoProduct, type ProductInfo } from "./types";

/* Text below is taken from "Agitator description.docx". */

const description =
  "An agitator is a machine or mixing device used to stir and mix liquids, powders, or other materials inside a tank or vessel. It uses a rotating shaft and blades to keep the material moving and properly mixed.";

const uses = [
  "Mix different materials evenly.",
  "Prevent solid particles from settling at the bottom of a tank.",
  "Keep liquids and chemicals well blended.",
  "Maintain a consistent mixture during processing.",
  "Improve heat and mass transfer inside the tank.",
  "Prevent separation of materials during storage or production.",
];

export const agitatorProducts = [
  infoProduct({
    name: "Agitator",
    category: "Agitators",
    subtitle: "SuperC",
    description,
    features: uses,
    specs: { Brand: "SuperC", Type: "Agitator" },
    imagePath: "/products/agitator/agitator.webp",
    galleryImages: [
      "/agitator/support/20241106_100314.jpg",
      "/agitator/support/20241106_095557.jpg",
      "/agitator/support/20241106_095502.jpg",
      "/agitator/support/6c34cd4c-989b-4d44-bf85-9fc145a3d578.jpg",
      "/agitator/support/83adfe56-42f6-4040-8c51-1ff8d0c04c5e.jpg",
    ],
  }),
];

export const agitatorInfo: ProductInfo = {
  path: "/agitator",
  title: "Agitator",
  description,
  logo: { src: "/agitator/superc.png", alt: "SuperC Agitator" },
  productGroups: [
    {
      products: agitatorProducts,
      photos: [
        "/agitator/support/00388ae5-03bf-4e4e-8549-002e40b1b564.jpg",
        "/agitator/support/046ef9d6-d0d2-46a9-a166-5b559eb8d791.jpg",
        "/agitator/support/20220224_140637.jpg",
        "/agitator/support/20241106_095502.jpg",
        "/agitator/support/20241106_095557.jpg",
        "/agitator/support/20241106_095749.jpg",
        "/agitator/support/20241106_100314.jpg",
        "/agitator/support/20241106_100330.jpg",
        "/agitator/support/25e5f8f4-04ab-4752-a08a-b4a9f5971bed.jpg",
        "/agitator/support/26939228-02a5-4379-8d19-26112b20952b.jpg",
        "/agitator/support/2e49033a-0875-4a50-ab97-12c9eedf63bf.jpg",
        "/agitator/support/33d637ba-a979-4078-af4e-ee3d1bdb4519.jpg",
        "/agitator/support/3e519fb6-2c7e-462d-86f4-bd3803a6070c.jpg",
        "/agitator/support/6237a56a-19a3-4f03-a742-63abceac5e8c.jpg",
        "/agitator/support/689c00a8-25ca-4f98-b6ba-73b2fffab05a.jpg",
        "/agitator/support/6c34cd4c-989b-4d44-bf85-9fc145a3d578.jpg",
        "/agitator/support/6ff4a67e-0a55-4e4b-8b28-0da24d354ca0.jpg",
        "/agitator/support/83adfe56-42f6-4040-8c51-1ff8d0c04c5e.jpg",
        "/agitator/support/9ae20327-eed9-4706-b795-9f38271f240f.jpg",
        "/agitator/support/ad5d6a5c-5468-4cca-a2c0-78f9c54ec848.jpg",
        "/agitator/support/b9073493-dc38-4c44-a0ed-77b12d2abbd5.jpg",
        "/agitator/support/d38087e3-30f0-4046-b6aa-79ff71c45707.jpg",
        "/agitator/support/dfbad3b8-304a-4c1b-9a53-b3a253512ff5.jpg",
        "/agitator/support/e1cbf09a-ed3f-4144-97d5-12c0aebdc577.jpg",
        "/agitator/support/e88c7f73-9482-49e6-817d-3b4791213cbc.jpg",
        "/agitator/support/ec37d7e0-a404-4c51-a704-6d9a7336da82.jpg",
        "/agitator/support/f138f509-15ed-4641-b1fe-b2ff85d4366d.jpg",
      ],
    },
  ],
  sections: [
    { kind: "text", paragraphs: ["An agitator is a mechanical device used to mix, blend, or stir liquids, powders, or liquid-solid mixtures inside a tank. An electric motor is commonly used to drive the agitator and provide the rotational force needed for mixing."] },
  ],
  simplyPut: { label: "Simply put:", text: "An agitator keeps the contents of a tank moving and properly mixed for a consistent and efficient process." },
};
