import type { Metadata, Viewport } from "next";
import { Anton, Inter_Tight, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F4EFE6",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "HEGXAI | Every Task. Automated.",
  description: "AI agents and workflow automation for businesses",
  openGraph: {
    title: "HEGXAI | Every Task. Automated.",
    description: "AI agents and workflow automation for businesses",
    url: siteUrl,
    siteName: "HEGXAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HEGXAI | Every Task. Automated.",
    description: "AI agents and workflow automation for businesses",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HEGXAI",
  url: siteUrl,
  description: "AI agents and workflow automation for businesses",
};

import { BookingProvider } from "@/components/ui/BookingProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interTight.variable} ${anton.variable} ${dmSans.variable} ${ibmMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body style={{ fontFamily: "var(--ff-body, 'DM Sans', sans-serif)" }}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  );
}
