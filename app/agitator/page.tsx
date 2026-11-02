import type { Metadata } from "next";
import { ProductInfoPage } from "../components/ProductInfoPage";
import { agitatorInfo } from "../../db/info/agitator";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Agitator | MP&E Technology Malaysia",
  description: agitatorInfo.description,
  alternates: {
    canonical: "/agitator",
  },
};

export default function Page() {
  return <ProductInfoPage info={agitatorInfo} />;
}
