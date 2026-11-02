import { acMotorProducts } from "./ac-motor-products";
import { agitatorProducts } from "./info/agitator";
import { bearingProducts } from "./info/bearing";
import { beltingProducts } from "./info/belting";
import { chainSprocketProducts } from "./info/chain-sprocket";
import { conveyorRollerProducts } from "./info/conveyor-roller";
import { conveyorSprocketProducts } from "./info/conveyor-sprocket";
import { couplingProducts } from "./info/coupling";
import type { CreateProductInput } from "./product-store-types";

export const starterProducts: CreateProductInput[] = [
  {
    name: "WPX 50 Worm Gear Reducer",
    category: "Gear Reducers",
    subtitle: "Right-angle speed reduction",
    description: "A compact cast-iron worm gear reducer for dependable torque multiplication in conveyors, mixers and general industrial machinery.",
    features: ["Compact right-angle drive", "Rigid cast-iron housing", "Multiple ratio options"],
    specs: { Series: "WPX", Size: "50", Type: "Worm gear reducer", Mounting: "Foot mounted" },
    imagePath: "/products/worm-reducer.png",
    externalUrl: null,
    featured: true,
  },
  ...acMotorProducts,
  ...agitatorProducts,
  ...bearingProducts,
  ...beltingProducts,
  ...chainSprocketProducts,
  ...conveyorRollerProducts,
  ...conveyorSprocketProducts,
  ...couplingProducts,
  {
    name: "FCL Flexible Pin-Bush Coupling",
    category: "Couplings",
    subtitle: "Smooth torque transmission",
    description: "A practical flexible coupling that cushions shock loads, reduces vibration and accommodates minor shaft misalignment.",
    features: ["Replaceable rubber bushes", "Vibration damping", "Simple maintenance"],
    specs: { Series: "FCL", Material: "Cast iron", Element: "Rubber pin bush", Use: "Motor-to-driven shaft" },
    imagePath: "/products/coupling.png",
    externalUrl: null,
    featured: true,
  },
  {
    name: "1610 Taper Lock V-Belt Pulley",
    category: "Pulleys",
    subtitle: "Fast, secure shaft mounting",
    description: "A taper-lock pulley system designed for convenient installation, reliable concentricity and easy removal from the shaft.",
    features: ["Machining-free shaft fit", "Multiple groove profiles", "Easy installation and removal"],
    specs: { Bush: "1610", Profiles: "SPZ / SPA / SPB", Material: "Cast iron", Bore: "Multiple sizes" },
    imagePath: "/products/pulley.webp",
    externalUrl: null,
    featured: false,
  },
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
