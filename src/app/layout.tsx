import type { Metadata, Viewport } from "next";
import { Anton, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
};

export const metadata: Metadata = {
  title: "HEGXAI — Intelligent Automation for Modern Teams",
  description:
    "HEGXAI is a B2B AI automation agency that designs and deploys custom workflow automation, AI agents, and system integrations to help your business scale faster.",
  keywords:
    "AI automation, workflow automation, AI agents, business automation, B2B AI, process automation",
  openGraph: {
    title: "HEGXAI — Every Task. Automated.",
    description:
      "Automation built for growth. We design and deploy AI-powered workflows that scale with your team.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anton.variable} ${dmSans.variable} ${ibmMono.variable}`}
    >
      <body
        suppressHydrationWarning
        style={{ fontFamily: "var(--ff-body, 'DM Sans', sans-serif)" }}
      >
        {children}
      </body>
    </html>
  );
}
