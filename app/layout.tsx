import { WhatsAppButton } from "./components/WhatsAppButton";
import { CursorEffects } from "./components/CursorEffects";
import { ScrollReveal } from "./components/ScrollReveal";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { absoluteUrl } from "./lib/url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = await absoluteUrl("/");
  const image = await absoluteUrl("/og.png");

  const title =
    "MP&E Technology | Industrial Power Transmission";

  const description =
    "Motors, worm gear reducers, couplings, V-belts and industrial transmission components in Malaysia.";

  return {
    metadataBase: new URL(siteUrl),

    title,
    description,

    alternates: {
      canonical: "/",
    },

    icons: {
      icon: "/mpe-logo.png",
      shortcut: "/mpe-logo.png",
    },

    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt:
            "MP&E Technology industrial product range",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-MY">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <ScrollReveal />
        <CursorEffects />

        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
