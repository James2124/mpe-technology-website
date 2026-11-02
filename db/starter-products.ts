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

export const starterProducts: CreateProductInput[] = [
  ...acMotorProducts,
  ...agitatorProducts,
  ...bearingProducts,
  ...beltingProducts,
  ...chainSprocketProducts,
  ...conveyorRollerProducts,
  ...conveyorSprocketProducts,
  ...couplingProducts,
  ...gearboxProducts,
  ...oilLubricationProducts,
  ...pulleyProducts,
  ...rollerChainProducts,
  ...waterPumpProducts,
  ...blowerFanProducts,
  {
    name: "Classical Industrial V-Belt",
    category: "V-Belts",
    subtitle: "Reliable flexible power transfer",
    description: "A durable classical-section V-belt for smooth, quiet power transmission across a wide range of industrial equipment.",
    features: ["Oil and heat resistant", "Low-stretch tension member", "Broad size availability"],
    specs: { Type: "Classical V-belt", Sections: "A / B series", Material: "Reinforced rubber", Use: "Industrial drives" },
    imagePath: "/products/v-belt.png",
    externalUrl: null,
    featured: false,
  },
  {
    name: "NMRV Aluminium Worm Reducer",
    category: "Gear Reducers",
    subtitle: "Lightweight modular gearbox",
    description: "A modular aluminium worm reducer offering flexible mounting positions and a clean, compact footprint for machine builders.",
    features: ["Lightweight aluminium housing", "Flexible mounting positions", "Quiet running"],
    specs: { Series: "NMRV", Housing: "Aluminium", Drive: "Right angle", Lubrication: "Long-life oil" },
    imagePath: "/products/nmrv.jpg",
    externalUrl: null,
    featured: false,
  },
];
