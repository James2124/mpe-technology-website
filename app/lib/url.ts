import { headers } from "next/headers";

export async function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  const origin = host ? `${protocol}://${host}` : "http://localhost:3000";
  return new URL(path, origin).toString();
}
