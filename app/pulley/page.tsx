import type { Metadata } from "next";
import { ProductInfoPage } from "../components/ProductInfoPage";
import { pulleyInfo } from "../../db/info/pulley";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pulley | MP&E Technology Malaysia",
  description: pulleyInfo.description,
  alternates: {
    canonical: "/pulley",
  },
};

export default function Page() {
  return <ProductInfoPage info={pulleyInfo} />;
}
