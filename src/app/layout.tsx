import { Cinzel, Cormorant_Garamond } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://lukhman-shaheen-wedding.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "Shaik Mohammad Lukhman-E-Hayath & Shaik Shaheen Banu | Wedding Invitation",
  description:
    "You are warmly invited to celebrate the Dawat-e-Valima of Shaik Mohammad Lukhman-E-Hayath & Shaik Shaheen Banu on 31 August 2026.",
  openGraph: {
    title:
      "Shaik Mohammad Lukhman-E-Hayath & Shaik Shaheen Banu | Wedding Invitation",
    description:
      "You are warmly invited to celebrate the Dawat-e-Valima of Shaik Mohammad Lukhman-E-Hayath & Shaik Shaheen Banu on 31 August 2026.",
    images: [
      {
        url: "/og/invite-og.jpg",
        width: 1200,
        height: 630,
        alt: "Lukhman & Shaheen Wedding Invitation",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lukhman & Shaheen | Wedding Invitation",
    description:
      "Dawat-e-Valima — 31 August 2026, Mastan Vali Function Hall, Guntakal.",
    images: ["/og/invite-og.jpg"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-[color:var(--burgundy-deep)] text-[color:var(--ivory)]">
        {children}
      </body>
    </html>
  );
}
