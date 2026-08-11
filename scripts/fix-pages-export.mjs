import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

if (process.env.GITHUB_PAGES === "true") {
  const exportRoot = join(process.cwd(), "dist", "client");

  async function fixHtml(directory) {
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const filePath = join(directory, entry.name);

      if (entry.isDirectory()) {
        await fixHtml(filePath);
        continue;
      }

      if (extname(entry.name) !== ".html") continue;

      const html = await readFile(filePath, "utf8");
      const fixed = html.replaceAll('/./_next/', './_next/');

      if (fixed !== html) await writeFile(filePath, fixed, "utf8");

      const localAbsoluteReference = fixed.match(/(?:src|href)="\/(?!\/)/);
      if (localAbsoluteReference) {
        throw new Error(
          `GitHub Pages export still contains an absolute local URL in ${filePath}`,
        );
      }
    }
  }

  await fixHtml(exportRoot);
  console.log("GitHub Pages paths are relative and ready to deploy.");
}
