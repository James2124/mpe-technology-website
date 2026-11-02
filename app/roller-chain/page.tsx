import type { Metadata } from "next";
import { ProductInfoPage } from "../components/ProductInfoPage";
import { rollerChainInfo } from "../../db/info/roller-chain";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Roller Chain | MP&E Technology Malaysia",
  description: rollerChainInfo.description,
  alternates: {
    canonical: "/roller-chain",
  },
};

export default function Page() {
  return <ProductInfoPage info={rollerChainInfo} />;
}
