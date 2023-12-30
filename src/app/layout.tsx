import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

import "./globals.css";

const font = Noto_Sans_JP({ weight: "400", subsets: ["latin"] });

const title = "saitoxu.io";
const description =
  "Web開発や機械学習, プロダクトマネジメントなどについて雑多に書きます。";
const keywords = [
  "Web",
  "AI",
  "Machine Learning",
  "Product Management",
  "プロダクト開発",
  "saitoxu",
  "Yosuke Saito",
  "斎藤",
  "斎藤陽介",
];

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://saitoxu.io"),
  title,
  description,
  keywords,
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
