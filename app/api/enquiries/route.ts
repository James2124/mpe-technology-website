import { createEnquiry } from "../../../db/products";

function field(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

export async function POST(request: Request) {
  const form = await request.formData();
  const name = field(form, "name");
  const email = field(form, "email");
  const message = field(form, "message");
  if (!name || !email || !message) {
    return new Response("Name, email and requirement are required.", { status: 400 });
  }
  await createEnquiry({
    name: name.slice(0, 120),
    company: field(form, "company").slice(0, 160),
    email: email.slice(0, 200),
    phone: field(form, "phone").slice(0, 80),
    productInterest: field(form, "productInterest").slice(0, 240),
    message: message.slice(0, 4000),
  });
  return Response.redirect(new URL("/contact?sent=1", request.url), 303);
}
