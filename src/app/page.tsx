import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

export default async function Home() {
  const content = await getContent();
  return (
    <main className="text-lg">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}

async function getContent() {
  const filePath = path.join(process.cwd(), "content", "home.md");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const processedContent = await remark().use(html).process(fileContent);
  const content = processedContent.toString();
  return content;
}
