import type { Metadata } from "next";
import { ProductInfoPage } from "../components/ProductInfoPage";
import { conveyorSprocketInfo } from "../../db/info/conveyor-sprocket";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Conveyor Sprocket | MP&E Technology Malaysia",
  description: conveyorSprocketInfo.description,
  alternates: {
    canonical: "/conveyor-sprocket",
  },
};

export default function Page() {
  return <ProductInfoPage info={conveyorSprocketInfo} />;
}
