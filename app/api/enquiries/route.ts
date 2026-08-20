import nodemailer from "nodemailer";
import { createEnquiry } from "../../../db/products";

function field(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  const form = await request.formData();

  const name = field(form, "name");
  const company = field(form, "company");
  const email = field(form, "email");
  const phone = field(form, "phone");
  const productInterest = field(form, "productInterest");
  const message = field(form, "message");

  if (!name || !email || !message) {
    return new Response(
      "Name, email and requirement are required.",
      { status: 400 }
    );
  }

  await createEnquiry({
    name: name.slice(0, 120),
    company: company.slice(0, 160),
    email: email.slice(0, 200),
    phone: phone.slice(0, 80),
    productInterest: productInterest.slice(0, 240),
    message: message.slice(0, 4000),
  });

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailAppPassword) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const safeName = escapeHtml(name);
    const safeCompany = escapeHtml(company);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeProductInterest = escapeHtml(productInterest);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    await transporter.sendMail({
      from: `"MP&E Website" <${gmailUser}>`,
      to: "mptech.works@gmail.com",
      replyTo: email,

      subject: productInterest
        ? `New enquiry: ${productInterest}`
        : `New enquiry from ${name}`,

      text: `
New MP&E Technology website enquiry

Name:
${name}

Company:
${company || "-"}

Email:
${email}

Phone / WhatsApp:
${phone || "-"}

Product:
${productInterest || "-"}

Requirement:
${message}
      `.trim(),

      html: `
        <h2>New MP&amp;E Technology Website Enquiry</h2>

        <p>
          <strong>Name:</strong><br>
          ${safeName}
        </p>

        <p>
          <strong>Company:</strong><br>
          ${safeCompany || "-"}
        </p>

        <p>
          <strong>Email:</strong><br>
          ${safeEmail}
        </p>

        <p>
          <strong>Phone / WhatsApp:</strong><br>
          ${safePhone || "-"}
        </p>

        <p>
          <strong>Product:</strong><br>
          ${safeProductInterest || "-"}
        </p>

        <p>
          <strong>Requirement:</strong><br>
          ${safeMessage}
        </p>
      `,
    });
  }

  return Response.redirect(
    new URL("/contact?sent=1", request.url),
    303
  );
}
