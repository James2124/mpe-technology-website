import { getSiteSetting, updateSiteSetting } from "./products";
import { agitatorInfo } from "./info/agitator";
import { bearingInfo } from "./info/bearing";
import { beltingInfo } from "./info/belting";
import { blowerFanInfo } from "./info/blower-fan";
import { chainSprocketInfo } from "./info/chain-sprocket";
import { conveyorRollerInfo } from "./info/conveyor-roller";
import { conveyorSprocketInfo } from "./info/conveyor-sprocket";
import { couplingInfo } from "./info/coupling";
import { gearboxInfo } from "./info/gearbox";
import { oilLubricationInfo } from "./info/oil-lubrication";
import { pulleyInfo } from "./info/pulley";
import { rollerChainInfo } from "./info/roller-chain";
import { waterPumpInfo } from "./info/water-pump";
import type { ProductInfo } from "./info/types";

export type PhotoGroup = { title?: string; photos: string[] };

export type PhotoPage = {
  path: string;
  title: string;
  /** The photos shown until an administrator edits this page in /manage/photos. */
  defaultGroups: PhotoGroup[];
};

function fromInfo(info: ProductInfo): PhotoPage {
  const groups = info.photoGroups ?? info.productGroups.map((group) => ({ title: group.title, photos: group.photos }));
  return {
    path: info.path,
    title: info.title,
    defaultGroups: groups.map((group) => ({ title: group.title, photos: [...group.photos] })),
  };
}

export const photoPages: PhotoPage[] = [
  {
    path: "/ac-induction-motor",
    title: "AC Induction Motor",
    defaultGroups: [
      {
        photos: [
          "/ac-motor/container-loading-1.jpg",
          "/ac-motor/crated-motors-1.jpg",
          "/ac-motor/motor-delivery-2.jpg",
          "/ac-motor/warehouse-stock-2.jpg",
          "/ac-motor/three-phase-motor-blue-1.jpg",
          "/ac-motor/container-loading-3.jpg",
          "/ac-motor/crated-stock-2.jpg",
          "/ac-motor/geared-motor-1.jpg",
          "/ac-motor/three-phase-motor-grey-2.jpg",
          "/ac-motor/motor-delivery-1.jpg",
          "/ac-motor/warehouse-shelving.jpg",
          "/ac-motor/parts-stock-1.jpg",
        ],
      },
    ],
  },
  ...[
    agitatorInfo,
    bearingInfo,
    beltingInfo,
    blowerFanInfo,
    chainSprocketInfo,
    conveyorRollerInfo,
    conveyorSprocketInfo,
    couplingInfo,
    gearboxInfo,
    oilLubricationInfo,
    pulleyInfo,
    rollerChainInfo,
    waterPumpInfo,
  ].map(fromInfo),
];

export function findPhotoPage(path: string) {
  return photoPages.find((page) => page.path === path) ?? null;
}

const settingKey = (path: string) => `page_photos:${path}`;

function isPhotoGroups(value: unknown): value is PhotoGroup[] {
  return Array.isArray(value) && value.every(
    (group) => group && typeof group === "object" && Array.isArray((group as PhotoGroup).photos)
      && (group as PhotoGroup).photos.every((photo) => typeof photo === "string"),
  );
}

/** The photo groups for a page: the saved version if an administrator edited it, otherwise the defaults. */
export async function getPagePhotoGroups(path: string): Promise<PhotoGroup[]> {
  const page = findPhotoPage(path);
  if (!page) return [];
  const stored = await getSiteSetting(settingKey(path));
  return isPhotoGroups(stored) ? stored : page.defaultGroups;
}

export async function updatePagePhotoGroups(path: string, update: (groups: PhotoGroup[]) => PhotoGroup[]) {
  const page = findPhotoPage(path);
  if (!page) throw new Error(`Unknown photo page: ${path}`);
  return updateSiteSetting(settingKey(path), (current) =>
    update(structuredClone(isPhotoGroups(current) ? current : page.defaultGroups)),
  );
}
