import { NextResponse, type NextRequest } from "next/server";
import { basicAdminIsConfigured, validBasicAuthorization } from "./app/basic-auth";

export async function proxy(request: NextRequest) {
  if (!basicAdminIsConfigured()) return NextResponse.next();
  if (await validBasicAuthorization(request.headers.get("authorization"))) return NextResponse.next();

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "cache-control": "no-store",
      "www-authenticate": 'Basic realm="MP&E Catalog Manager", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/manage/:path*", "/api/products/:path*"],
};
