import type { ProductCatalog } from "./types";
import { saveProductFile, saveProductImage } from "../../db/products";

const MAX_CATALOG_PDF_BYTES = 20_000_000;
const MAX_COVER_IMAGE_BYTES = 8_000_000;
const COVER_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

export function catalogRowKeys(form: FormData): string[] {
  const keys = new Set<string>();
  for (const key of form.keys()) {
    const match = /^catalogPdf-(.+)$/.exec(key);
    if (match) keys.add(match[1]);
  }
  return [...keys];
}

export function validateCatalogRows(form: FormData): string | null {
  for (const rowKey of catalogRowKeys(form)) {
    const pdf = form.get(`catalogPdf-${rowKey}`);
    const cover = form.get(`catalogCoverImage-${rowKey}`);
    const hasPdf = pdf instanceof File && pdf.size > 0;
    const hasCover = cover instanceof File && cover.size > 0;
    if (!hasPdf && !hasCover) continue;
    if (!hasPdf || !(pdf instanceof File)) return "Each catalog needs a PDF file.";
    if (pdf.type !== "application/pdf" || pdf.size > MAX_CATALOG_PDF_BYTES) {
      return "Catalog PDFs must be a PDF file under 20 MB.";
    }
    if (!hasCover || !(cover instanceof File)) return "Each catalog PDF needs a cover image.";
    if (!COVER_IMAGE_TYPES.includes(cover.type) || cover.size > MAX_COVER_IMAGE_BYTES) {
      return "Catalog cover images must be PNG, JPEG or WebP and under 8 MB.";
    }
  }
  return null;
}

export async function saveCatalogRows(form: FormData): Promise<ProductCatalog[]> {
  const catalogs: ProductCatalog[] = [];
  for (const rowKey of catalogRowKeys(form)) {
    const pdf = form.get(`catalogPdf-${rowKey}`);
    const cover = form.get(`catalogCoverImage-${rowKey}`);
    if (!(pdf instanceof File) || pdf.size === 0) continue;
    if (!(cover instanceof File) || cover.size === 0) continue;
    const pdfKey = await saveProductFile(pdf);
    const coverKey = await saveProductImage(cover);
    catalogs.push({
      pdfPath: `/api/product-files/${pdfKey}`,
      coverImagePath: `/api/product-images/${coverKey}`,
    });
  }
  return catalogs;
}
