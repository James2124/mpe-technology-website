import type { Metadata } from "next";
import { ProductInfoPage } from "../components/ProductInfoPage";
import { bearingInfo } from "../../db/info/bearing";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bearing | MP&E Technology Malaysia",
  description: bearingInfo.description,
  alternates: {
    canonical: "/bearing",
  },
};

export default function Page() {
  return <ProductInfoPage info={bearingInfo} />;
}
