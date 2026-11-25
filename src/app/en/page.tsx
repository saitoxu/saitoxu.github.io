import type { Metadata } from "next";
import { renderMarkdown } from "@/lib/markdown";

export const metadata: Metadata = {
  openGraph: { locale: "en_US" },
};

export default async function Page() {
  const content = await renderMarkdown("en");
  return (
    <main className="markdown" lang="en">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}
