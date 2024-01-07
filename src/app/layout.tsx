import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

import "./globals.css";

const font = Noto_Sans_JP({ weight: ["400", "700"], subsets: ["latin"] });

const title = "Yosuke Saito";
const description = "I'm a full-stack developer based in Tokyo, Japan.";

export const viewport = {
  width: "device-width",
  initialScale: 1,
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={font.className}>
        <div className="flex justify-center max-w-3xl flex-col mx-auto p-4">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
