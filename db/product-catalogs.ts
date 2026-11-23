import type { ProductCatalog } from "../app/lib/types";

/* Catalogs from "MP&E CATALOG", by product slug. PNG sheets were converted to one-page PDFs (sharpened, lossless);
   photos in the multi-page PDFs were upscaled; every page has a faint MP&E logo watermark. */

const c = (name: string): ProductCatalog => ({
  pdfPath: `/catalogs/hd/${name}.pdf`,
  coverImagePath: `/catalogs/hd/${name}-cover.webp`,
});

const bearing6000 = [c("deep-groove-ball-bearing-6000"), c("deep-groove-ball-bearing-6200"), c("deep-groove-ball-bearing-6300")];
const tecoMotor = [c("teco-aesv2s-aesv3s-2017")];
const wpxWpo = [c("wpx-wpo")];

export const productCatalogs: Record<string, ProductCatalog[]> = {
  agitator: [c("superc-agitator")],
  "three-phase-b3-foot-mounted": tecoMotor,
  "three-phase-b5-flange-mounted": tecoMotor,
  "fag-6000-series": bearing6000,
  "ntn-6000-series": bearing6000,
  "skf-6000-series": bearing6000,
  "chain-coupling": [c("chain-coupling")],
  "fcl-coupling": [c("fcl-flexible-coupling"), c("fcl-coupling-bolt-nut"), c("fcl-coupling-rubber-bush")],
  "hrc-coupling": [c("hrc-coupling")],
  "jaw-coupling": [c("jaw-coupling")],
  "tyre-coupling": [c("tyre-coupling")],
  wpa: [c("wpa")],
  wpx: wpxWpo,
  wpo: wpxWpo,
};
