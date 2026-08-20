import {
  getCatalogAdmin,
  unauthorizedAdminResponse,
} from "../../../../admin-auth";

import {
  listProducts,
  updateProduct,
} from "../../../../../db/products";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  if (!(await getCatalogAdmin())) {
    return unauthorizedAdminResponse();
  }

  const { id } = await params;

  const productId = Number(id);

  if (!Number.isFinite(productId)) {
    return new Response(
      "Invalid product ID.",
      { status: 400 }
    );
  }

  const products = await listProducts();

  const product = products.find(
    (item) => item.id === productId
  );

  if (!product) {
    return new Response(
      "Product not found.",
      { status: 404 }
    );
  }

  const form = await request.formData();

  const rawOrder = String(
    form.get("sortOrder") ?? ""
  ).trim();

  const sortOrder =
    Number(rawOrder) > 0
      ? Number(rawOrder)
      : undefined;

  await updateProduct(productId, {
    name: product.name,
    category: product.category,
    subtitle: product.subtitle,
    description: product.description,
    features: product.features,
    specs: product.specs,
    imagePath: product.imagePath,
    externalUrl: product.externalUrl,
    featured: product.featured,
    sortOrder,
  });

  return new Response("OK");
}
