import type { Metadata } from "next";
import { ProductInfoPage } from "../components/ProductInfoPage";
import { gearboxInfo } from "../../db/info/gearbox";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Worm Gear Reducer | MP&E Technology Malaysia",
  description: gearboxInfo.description,
  alternates: {
    canonical: "/gearbox",
  },
};

export default function Page() {
  return <ProductInfoPage info={gearboxInfo} />;
}
