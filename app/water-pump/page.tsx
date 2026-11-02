import type { Metadata } from "next";
import { ProductInfoPage } from "../components/ProductInfoPage";
import { waterPumpInfo } from "../../db/info/water-pump";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Water Pump | MP&E Technology Malaysia",
  description: waterPumpInfo.description,
  alternates: {
    canonical: "/water-pump",
  },
};

export default function Page() {
  return <ProductInfoPage info={waterPumpInfo} />;
}
