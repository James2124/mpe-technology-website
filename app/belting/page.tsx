import type { Metadata } from "next";
import { ProductInfoPage } from "../components/ProductInfoPage";
import { beltingInfo } from "../../db/info/belting";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Belting | MP&E Technology Malaysia",
  description: beltingInfo.description,
  alternates: {
    canonical: "/belting",
  },
};

export default function Page() {
  return <ProductInfoPage info={beltingInfo} />;
}
