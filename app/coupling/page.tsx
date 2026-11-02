import type { Metadata } from "next";
import { ProductInfoPage } from "../components/ProductInfoPage";
import { couplingInfo } from "../../db/info/coupling";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Coupling | MP&E Technology Malaysia",
  description: couplingInfo.description,
  alternates: {
    canonical: "/coupling",
  },
};

export default function Page() {
  return <ProductInfoPage info={couplingInfo} />;
}
