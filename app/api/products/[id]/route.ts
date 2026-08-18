import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { claimOrCheckAdmin, deleteProduct } from "../../../../db/products";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getChatGPTUser();
  if (!user || !(await claimOrCheckAdmin(user))) return new Response("Unauthorized", { status: 401 });
  const { id } = await params;
  const product = await deleteProduct(Number(id));
  if (product?.imagePath?.startsWith("/api/product-images/")) {
    const bucket = (env as unknown as { PRODUCT_IMAGES?: R2Bucket }).PRODUCT_IMAGES;
    await bucket?.delete(product.imagePath.slice("/api/product-images/".length));
  }
  return Response.redirect(new URL("/manage", request.url), 303);
}
