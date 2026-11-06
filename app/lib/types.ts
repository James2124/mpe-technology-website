export type ProductCatalog = {
  pdfPath: string;
  coverImagePath: string;
};

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

  galleryImages?: string[];
  videoUrls?: string[];
  catalogs?: ProductCatalog[];

  externalUrl: string | null;
  featured: boolean;
  sortOrder?: number;
  createdAt: string;
};

export type EnquiryType = "product" | "repair" | "customization" | "general";

export type Enquiry = {
  id: number;
  enquiryType: EnquiryType;
  name: string;
  company: string;
  email: string;
  phone: string;
  productInterest: string;
  message: string;
  createdAt: string;
};

export type HomeShowcaseCard = {
  id: string;
  title: string;
  imagePath: string;
  href: string;
};

/** The large feature block and the small link cards under "Product specialist" on the home page. */
export type HomeShowcase = {
  feature: {
    title: string;
    text: string;
    imagePath: string;
    href: string;
    buttonLabel: string;
  };
  cards: HomeShowcaseCard[];
};
