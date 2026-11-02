import { acMotorProducts } from "./ac-motor-products";
import { agitatorProducts } from "./info/agitator";
import { bearingProducts } from "./info/bearing";
import { beltingProducts } from "./info/belting";
import type { CreateProductInput } from "./product-store-types";

/**
 * Product batches added to catalogs that already exist on the server.
 * Each batch is applied once; afterwards administrators can edit or delete
 * the products in /manage without them coming back.
 */
export const catalogSeedBatches: { id: string; products: CreateProductInput[] }[] = [
  { id: "2026-11-ac-induction-motors", products: acMotorProducts },
  { id: "2026-11-agitator", products: agitatorProducts },
  { id: "2026-11-bearings", products: bearingProducts },
  { id: "2026-11-belting", products: beltingProducts },
];
