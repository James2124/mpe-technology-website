import type { Metadata } from "next";
import { ProductInfoPage } from "../components/ProductInfoPage";
import { oilLubricationInfo } from "../../db/info/oil-lubrication";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Oil Lubrication | MP&E Technology Malaysia",
  description: oilLubricationInfo.description,
  alternates: {
    canonical: "/oil-lubrication",
  },
};

export default function Page() {
  return <ProductInfoPage info={oilLubricationInfo} />;
}
