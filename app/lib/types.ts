export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  imagePath: string | null;
  externalUrl: string | null;
  featured: boolean;
  createdAt: string;
};

export type Enquiry = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  productInterest: string;
  message: string;
  createdAt: string;
};
