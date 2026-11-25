import fs from "node:fs/promises";
import path from "node:path";
import { remark } from "remark";
import html from "remark-html";

export async function renderMarkdown(name: string): Promise<string> {
  const filePath = path.join(process.cwd(), "content", `${name}.md`);
  const source = await fs.readFile(filePath, "utf8");
  const processed = await remark().use(html).process(joinCjkLines(source));
  return processed.toString();
}

// In Japanese text a soft line break would render as a stray space,
// so join lines that end with a CJK character.
const CJK = "\\u3000-\\u30ff\\u4e00-\\u9fff\\uff00-\\uffef";
function joinCjkLines(source: string): string {
  return source.replace(new RegExp(`([${CJK}])\\n(?=[^\\n\\s*#>-])`, "g"), "$1");
}
