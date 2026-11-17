import { acMotorProducts } from "./ac-motor-products";
import { agitatorProducts } from "./info/agitator";
import { bearingProducts } from "./info/bearing";
import { beltingProducts } from "./info/belting";
import { chainSprocketProducts } from "./info/chain-sprocket";
import { conveyorRollerProducts } from "./info/conveyor-roller";
import { conveyorSprocketProducts } from "./info/conveyor-sprocket";
import { couplingProducts } from "./info/coupling";
import { gearboxProducts } from "./info/gearbox";
import { oilLubricationProducts } from "./info/oil-lubrication";
import { pulleyProducts } from "./info/pulley";
import { rollerChainProducts } from "./info/roller-chain";
import { waterPumpProducts } from "./info/water-pump";
import { blowerFanProducts } from "./info/blower-fan";
import { productSlug } from "./info/types";
import { productCatalogs } from "./product-catalogs";
import type { ProductCatalog } from "../app/lib/types";
import type { CreateProductInput } from "./product-store-types";

/**
 * Changes applied once to catalogs that already exist on the server.
 * A batch adds `products` (skipping slugs that already exist), deletes
 * `removeSlugs`, replaces the gallery photos of the products named in
 * `setGalleries` (slug → photos), and swaps picture paths listed in
 * `replaceImages` (old path → new path) wherever they are used, and sets the
 * downloadable catalogs of the products named in `setCatalogs` (slug → catalogs). Each batch id is recorded after it runs, so administrators
 * can edit or delete products in /manage without the batch undoing it.
 */
export type CatalogSeedBatch = {
  id: string;
  products?: CreateProductInput[];
  removeSlugs?: string[];
  setGalleries?: Record<string, string[]>;
  replaceImages?: Record<string, string>;
  setCatalogs?: Record<string, ProductCatalog[]>;
};

function galleriesBySlug(products: CreateProductInput[]) {
  return Object.fromEntries(products.map((product) => [productSlug(product.name), product.galleryImages ?? []]));
}

export const catalogSeedBatches: CatalogSeedBatch[] = [
  { id: "2026-11-ac-induction-motors", products: acMotorProducts },
  { id: "2026-11-agitator", products: agitatorProducts },
  { id: "2026-11-bearings", products: bearingProducts },
  { id: "2026-11-belting", products: beltingProducts },
  { id: "2026-11-chain-sprocket", products: chainSprocketProducts },
  { id: "2026-11-conveyor-roller", products: conveyorRollerProducts },
  { id: "2026-11-conveyor-sprocket", products: conveyorSprocketProducts },
  { id: "2026-11-coupling", products: couplingProducts },
  { id: "2026-11-gearbox", products: gearboxProducts },
  { id: "2026-11-oil-lubrication", products: oilLubricationProducts },
  { id: "2026-11-pulley", products: pulleyProducts },
  { id: "2026-11-roller-chain", products: rollerChainProducts },
  { id: "2026-11-water-pump", products: waterPumpProducts },
  { id: "2026-11-blower-fan", products: blowerFanProducts },
  {
    id: "2026-11-remove-old-duplicates",
    removeSlugs: [
      "b5-three-phase-ac-motor",
      "fcl-flexible-pin-bush-coupling",
      "wpx-50-worm-gear-reducer",
      "1610-taper-lock-v-belt-pulley",
    ],
  },
  {
    id: "2026-11-remove-old-v-belt",
    removeSlugs: ["classical-industrial-v-belt"],
  },
  {
    // Gallery photos now show only the model named; previously every model
    // in a group shared the same photos.
    id: "2026-11-per-model-galleries",
    setGalleries: galleriesBySlug([...bearingProducts, ...gearboxProducts, ...pulleyProducts]),
  },
  {
    // Background-free (transparent) versions of pictures that were JPEG photos.
    id: "2026-11-transparent-product-pictures",
    replaceImages: Object.fromEntries(
      [
        "conveyor-roller/20240801_111732",
        "conveyor-sprocket/95e99121-6e03-4897-96da-8bedaecbe568",
        "oil-lubrication/20220509_131258",
        "oil-lubrication/20220902_102019",
        "roller-chain/roller-chain",
      ].map((name) => [`/products/${name}.jpg`, `/products/${name}.webp`]),
    ),
  },
  {
    // Undo the transparent exploded-view diagram (reverted): point the motor galleries back at the original.
    id: "2026-11-revert-motor-diagram",
    replaceImages: { "/ac-motor/motor-exploded-view.webp": "/ac-motor/motor-exploded-view.jpg" },
  },
  {
    // New file names for pictures whose backgrounds were removed in place, so browsers and caches
    // fetch the transparent versions instead of reusing the old white-background copies.
    id: "2026-11-transparent-picture-names",
    replaceImages: Object.fromEntries(
      ["chain-sprocket/chain-sprocket", "gearbox/wpa", "gearbox/wpo", "gearbox/wpx", "pulley/vee-pulley"].map((name) => [
        `/products/${name}.webp`,
        `/products/${name}-transparent.webp`,
      ]),
    ),
  },
  {
    // Catalogs from "MP&E CATALOG" attached to their products.
    id: "2026-11-product-catalogs",
    setCatalogs: productCatalogs,
  },
  {
    // Sharper catalogs with a larger watermark, under new paths so browsers don't reuse the old files.
    id: "2026-11-product-catalogs-hd",
    setCatalogs: productCatalogs,
  },
];
