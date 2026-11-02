import type { Metadata } from "next";
import { ProductInfoPage } from "../components/ProductInfoPage";
import { chainSprocketInfo } from "../../db/info/chain-sprocket";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Chain Sprocket | MP&E Technology Malaysia",
  description: chainSprocketInfo.description,
  alternates: {
    canonical: "/chain-sprocket",
  },
};

export default function Page() {
  return <ProductInfoPage info={chainSprocketInfo} />;
}
