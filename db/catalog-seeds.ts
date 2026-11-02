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
];
