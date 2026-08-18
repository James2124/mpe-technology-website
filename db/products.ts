import type { ChatGPTUser } from "../app/chatgpt-auth";
import type { Enquiry, Product } from "../app/lib/types";
import type { CreateEnquiryInput, CreateProductInput, StoredProductImage } from "./product-store-types";

type ProductBackend = {
  ensureProductSchema(): Promise<void>;
  listProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  createProduct(input: CreateProductInput): Promise<string>;
  deleteProduct(id: number): Promise<Product | null>;
  claimOrCheckAdmin(user: ChatGPTUser): Promise<boolean>;
  createEnquiry(input: CreateEnquiryInput): Promise<void>;
  listEnquiries(): Promise<Enquiry[]>;
  saveProductImage(image: File): Promise<string>;
  readProductImage(key: string): Promise<StoredProductImage | null>;
  removeProductImage(key: string): Promise<void>;
};

let backendPromise: Promise<ProductBackend> | null = null;

function backend(): Promise<ProductBackend> {
  backendPromise ??= process.env.MPE_STORAGE_DRIVER === "file"
    ? import("./products.node")
    : import("./products.cloudflare");
  return backendPromise;
}

export async function ensureProductSchema() {
  return (await backend()).ensureProductSchema();
}

export async function listProducts() {
  return (await backend()).listProducts();
}

export async function getProductBySlug(slug: string) {
  return (await backend()).getProductBySlug(slug);
}

export async function createProduct(input: CreateProductInput) {
  return (await backend()).createProduct(input);
}

export async function deleteProduct(id: number) {
  return (await backend()).deleteProduct(id);
}

export async function claimOrCheckAdmin(user: ChatGPTUser) {
  return (await backend()).claimOrCheckAdmin(user);
}

export async function createEnquiry(input: CreateEnquiryInput) {
  return (await backend()).createEnquiry(input);
}

export async function listEnquiries() {
  return (await backend()).listEnquiries();
}

export async function saveProductImage(image: File) {
  return (await backend()).saveProductImage(image);
}

export async function readProductImage(key: string) {
  return (await backend()).readProductImage(key);
}

export async function removeProductImage(key: string) {
  return (await backend()).removeProductImage(key);
}
