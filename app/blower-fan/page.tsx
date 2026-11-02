import type { Metadata } from "next";
import { ProductInfoPage } from "../components/ProductInfoPage";
import { blowerFanInfo } from "../../db/info/blower-fan";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blower Fan | MP&E Technology Malaysia",
  description: blowerFanInfo.description,
  alternates: {
    canonical: "/blower-fan",
  },
};

export default function Page() {
  return <ProductInfoPage info={blowerFanInfo} />;
}
