import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { claimOrCheckAdmin } from "../db/products";
import { basicAdminIsConfigured, validBasicAuthorization } from "./basic-auth";
import { chatGPTSignInPath, chatGPTSignOutPath, getChatGPTUser } from "./chatgpt-auth";

export type CatalogAdmin = {
  displayName: string;
  signOutPath: string | null;
};

export async function getCatalogAdmin(): Promise<CatalogAdmin | null> {
  if (basicAdminIsConfigured()) {
    const requestHeaders = await headers();
    if (!(await validBasicAuthorization(requestHeaders.get("authorization")))) return null;
    return {
      displayName: process.env.MPE_ADMIN_USERNAME!.trim(),
      signOutPath: null,
    };
  }

  const user = await getChatGPTUser();
  if (!user || !(await claimOrCheckAdmin(user))) return null;
  return { displayName: user.displayName, signOutPath: chatGPTSignOutPath("/") };
}

export async function requireCatalogAdmin(returnTo: string): Promise<CatalogAdmin | null> {
  const admin = await getCatalogAdmin();
  if (admin || basicAdminIsConfigured()) return admin;
  redirect(chatGPTSignInPath(returnTo));
}

export function unauthorizedAdminResponse() {
  const headers = new Headers();
  if (basicAdminIsConfigured()) headers.set("www-authenticate", 'Basic realm="MP&E Catalog Manager", charset="UTF-8"');
  return new Response("Unauthorized", { status: 401, headers });
}
