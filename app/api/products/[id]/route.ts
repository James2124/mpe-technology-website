import { getCatalogAdmin, unauthorizedAdminResponse } from "../../../admin-auth";
import { deleteProduct, removeProductImage } from "../../../../db/products";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getCatalogAdmin())) return unauthorizedAdminResponse();
  const { id } = await params;
  const product = await deleteProduct(Number(id));
  if (product?.imagePath?.startsWith("/api/product-images/")) {
    await removeProductImage(product.imagePath.slice("/api/product-images/".length));
  }
  return Response.redirect(new URL("/manage", request.url), 303);
}
