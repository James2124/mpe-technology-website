import type { Metadata } from "next";
import { ProductInfoPage } from "../components/ProductInfoPage";
import { conveyorRollerInfo } from "../../db/info/conveyor-roller";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Conveyor Roller | MP&E Technology Malaysia",
  description: conveyorRollerInfo.description,
  alternates: {
    canonical: "/conveyor-roller",
  },
};

export default function Page() {
  return <ProductInfoPage info={conveyorRollerInfo} />;
}
