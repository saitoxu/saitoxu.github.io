import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_JP } from "next/font/google";

import "./globals.css";

const plex = IBM_Plex_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-plex",
});

const title = "Yosuke Saito";
const description = "I'm a full-stack developer based in Tokyo, Japan.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1115" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://saitoxu.io"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://saitoxu.io",
    siteName: "saitoxu.io",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@saitoxu",
    images: ["/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={plex.variable}>
      <body>
        <div className="mx-auto flex max-w-2xl flex-col px-5 py-8 sm:py-12">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
      <GoogleAnalytics gaId="G-S9BNNDWE8F" />
    </html>
  );
}
