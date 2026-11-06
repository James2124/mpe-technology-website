import { infoProduct, type ProductInfo } from "./types";

/* Text below is taken from "Coupling description.docx". */

const description =
  "A coupling is a mechanical component used to connect two shafts, pipes, or components together so that power, movement, or fluid can be transferred from one side to another.";

const mechanical =
  "For mechanical applications, a coupling is commonly used to connect two rotating shafts, allowing them to work together while helping to accommodate minor misalignment and reduce vibration.";

const uses = [
  "Connecting two shafts in motors, pumps, gearboxes, and machinery",
  "Transmitting rotational power from one shaft to another",
  "Helping reduce vibration and compensate for slight shaft misalignment",
  "Providing easy installation and maintenance between connected components",
];

const galleries = {
  chain: [
    "/coupling/chain-coupling/20220901_171113.jpg",
    "/coupling/chain-coupling/20220901_171122.jpg",
    "/coupling/chain-coupling/20220914_161548.jpg",
    "/coupling/chain-coupling/471998801_589373267133832_6784758386205473759_n.jpg",
    "/coupling/chain-coupling/472005629_589373440467148_4177432263014128603_n.jpg",
    "/coupling/chain-coupling/472481602_592630326808126_8184758270637310791_n.jpg",
    "/coupling/chain-coupling/472721308_592630386808120_8487466617108306130_n.jpg",
    "/coupling/chain-coupling/473364052_599996739404818_491671725841683162_n.jpg",
  ],
  fcl: [
    "/coupling/fcl/20200204_115406.jpg",
    "/coupling/fcl/20201006_095037.jpg",
    "/coupling/fcl/20201006_095042.jpg",
    "/coupling/fcl/WhatsApp-Image-2022-06-11-at-10-07-33-AM-1.jpg",
    "/coupling/fcl/WhatsApp-Image-2022-06-11-at-10-07-33-AM.jpg",
  ],
};

function coupling(name: string, imagePath: string, galleryImages: string[] = []) {
  return infoProduct({
    name,
    category: "Couplings",
    subtitle: "Coupling",
    description: `${description} ${mechanical}`,
    features: uses,
    specs: { Type: name },
    imagePath,
    galleryImages,
  });
}

/* Product names are the original picture file names. */
export const couplingProducts = [
  coupling("Chain Coupling", "/products/coupling/chain-coupling.webp", galleries.chain),
  coupling("FCL Coupling", "/products/coupling/fcl-coupling.webp", galleries.fcl),
  coupling("HRC Coupling", "/products/coupling/hrc-coupling.webp"),
  coupling("Jaw coupling", "/products/coupling/jaw-coupling.webp"),
  coupling("Tyre Coupling", "/products/coupling/tyre-coupling.webp"),
];

export const couplingInfo: ProductInfo = {
  path: "/coupling",
  title: "Coupling",
  description,
  productGroups: [{ products: couplingProducts, photos: [] }],
  photoGroups: [
    { title: "Chain coupling", photos: galleries.chain },
    { title: "FCL", photos: galleries.fcl },
  ],
  sections: [
    { kind: "text", paragraphs: [mechanical] },
    { kind: "text", paragraphs: ["In simple terms: A coupling acts as a connector between two components, allowing them to work together as one system."] },
  ],
};
