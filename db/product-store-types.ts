import type { Enquiry, Product } from "../app/lib/types";

export type CreateProductInput = Omit<
  Product,
  "id" | "slug" | "createdAt"
> & {
  slug?: string;
};

export type UpdateProductInput = Omit<
  Product,
  "id" | "slug" | "createdAt"
>;

export type CreateEnquiryInput = Omit<
  Enquiry,
  "id" | "createdAt"
>;

export type StoredProductImage = {
  body: BodyInit;
  contentType: string;
  etag: string;
};
