import type { HomeShowcaseCard } from "../app/lib/types";
import { getSiteSetting, updateSiteSetting } from "./products";

/** Products shown around the logo in the homepage hero, clockwise from the top. Used until edited in /manage/homepage. */
export const defaultHeroProducts: HomeShowcaseCard[] = [
  { id: "hero-ac-motor", title: "AC Induction Motor", href: "/ac-induction-motor", imagePath: "/products/ac-motor/three-phase-b5-flange-mounted.webp" },
  { id: "hero-gearbox", title: "Worm Gear Reducer", href: "/gearbox", imagePath: "/products/gearbox/wpa-transparent.webp" },
  { id: "hero-water-pump", title: "Water Pump", href: "/water-pump", imagePath: "/products/water-pump/automatic-self-priming-pumps.webp" },
  { id: "hero-bearing", title: "Bearing", href: "/bearing", imagePath: "/products/bearing/skf-ucp.webp" },
  { id: "hero-blower-fan", title: "Blower Fan", href: "/blower-fan", imagePath: "/products/blower-fan/blower-fan.webp" },
  { id: "hero-coupling", title: "Coupling", href: "/coupling", imagePath: "/products/coupling/fcl-coupling.webp" },
  { id: "hero-pulley", title: "Pulley", href: "/pulley", imagePath: "/products/pulley/taper-lock-pulley.webp" },
  { id: "hero-chain-sprocket", title: "Chain Sprocket", href: "/chain-sprocket", imagePath: "/products/chain-sprocket/chain-sprocket-transparent.webp" },
];

const KEY = "hero_products";

function isCardList(value: unknown): value is HomeShowcaseCard[] {
  return Array.isArray(value) && value.every(
    (item) => item && typeof item === "object"
      && ["id", "title", "href", "imagePath"].every((key) => typeof (item as Record<string, unknown>)[key] === "string"),
  );
}

export async function getHeroProducts(): Promise<HomeShowcaseCard[]> {
  const stored = await getSiteSetting(KEY);
  return isCardList(stored) ? stored : defaultHeroProducts;
}

export async function updateHeroProducts(update: (current: HomeShowcaseCard[]) => HomeShowcaseCard[]) {
  return updateSiteSetting(KEY, (current) => update(structuredClone(isCardList(current) ? current : defaultHeroProducts)));
}
