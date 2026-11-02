import type { CreateProductInput } from "../product-store-types";

export type InfoGroup = { title: string; items: string[] };

export type InfoSection =
  | { kind: "list"; eyebrow: string; intro?: string; items: string[]; paragraphs?: string[] }
  | { kind: "groups"; eyebrow: string; intro?: string[]; subheading?: string; groups: InfoGroup[]; paragraphs?: string[] }
  | { kind: "text"; eyebrow?: string; paragraphs: string[] }
  | { kind: "images"; eyebrow?: string; images: { src: string; alt: string }[] };

export type InfoProductGroup = {
  title?: string;
  logo?: { src: string; alt: string };
  products: CreateProductInput[];
  photos: string[];
};

export type ProductInfo = {
  path: string;
  title: string;
  description: string;
  logo?: { src: string; alt: string };
  productGroups: InfoProductGroup[];
  sections: InfoSection[];
  simplyPut?: { label: string; text: string };
};

export function productSlug(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function infoProduct(
  input: Pick<CreateProductInput, "name" | "category" | "subtitle" | "description" | "features" | "specs" | "imagePath"> & {
    galleryImages?: string[];
  },
): CreateProductInput {
  return { ...input, externalUrl: null, featured: false };
}
