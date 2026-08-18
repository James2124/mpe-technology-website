import { readProductImage } from "../../../../db/products";

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const object = await readProductImage(key);
  if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers({
    "cache-control": "public, max-age=31536000, immutable",
    "content-type": object.contentType,
    etag: object.etag,
  });
  return new Response(object.body, { headers });
}
