import { cp, mkdir, rm } from "node:fs/promises";
import { basename } from "node:path";

const outputDir = "dist";
const staticEntries = ["index.html", "styles.css", "styles", "src", "assets"];
const ignoredNames = new Set([".DS_Store"]);

await rm(outputDir, { force: true, recursive: true });
await mkdir(outputDir, { recursive: true });

for (const entry of staticEntries) {
  await cp(entry, `${outputDir}/${entry}`, {
    filter: (source) => !ignoredNames.has(basename(source)),
    recursive: true,
  });
}
