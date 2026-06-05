import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

const outputDir = "dist";
const staticEntries = ["index.html", "styles.css", "styles", "src", "assets"];
const ignoredNames = new Set([".DS_Store"]);
const assetVersion = (process.env.GITHUB_SHA || Date.now().toString(36)).slice(0, 12);

await rm(outputDir, { force: true, recursive: true });
await mkdir(outputDir, { recursive: true });

for (const entry of staticEntries) {
  await cp(entry, `${outputDir}/${entry}`, {
    filter: (source) => !ignoredNames.has(basename(source)),
    recursive: true,
  });
}

const htmlPath = `${outputDir}/index.html`;
const cssPath = `${outputDir}/styles.css`;
const html = await readFile(htmlPath, "utf8");
const css = await readFile(cssPath, "utf8");

await writeFile(
  htmlPath,
  html
    .replace('href="./styles.css"', `href="./styles.css?v=${assetVersion}"`)
    .replace('src="./src/main.js"', `src="./src/main.js?v=${assetVersion}"`),
);

await writeFile(
  cssPath,
  css.replaceAll(/@import "(\.\/styles\/[^"]+\.css)";/g, `@import "$1?v=${assetVersion}";`),
);

await versionJavaScriptImports(`${outputDir}/src`);

async function versionJavaScriptImports(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(directory, entry.name);

      if (entry.isDirectory()) {
        await versionJavaScriptImports(entryPath);
        return;
      }

      if (!entry.isFile() || !entry.name.endsWith(".js")) return;

      const source = await readFile(entryPath, "utf8");
      await writeFile(entryPath, withVersionedRelativeImports(source));
    }),
  );
}

function withVersionedRelativeImports(source) {
  return source.replaceAll(
    /(from\s+["'])(\.{1,2}\/[^"']+\.js)(["'])/g,
    `$1$2?v=${assetVersion}$3`,
  );
}
