import { renderMarkdown } from "@/lib/markdown";

export default async function Page() {
  const content = await renderMarkdown("home");
  return (
    <main className="markdown">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}
