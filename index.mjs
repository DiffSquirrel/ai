import { promises as fs } from "fs";
import chalk from "chalk";
import { summarize } from "./ai.mjs";

let header = chalk.blueBright("DiffSquirrel AI 🐿️");
var url = process.argv[2];
if (!url) {
  throw new Error(`You must provide a URL`);
}

let patch = "";
if (url.startsWith("http")) {
  if (url.includes("pull") && !url.endsWith(".patch")) {
    url += ".patch";
  }
  header += chalk.gray("  processing URL " + url);
  console.log(header);
  const response = await fetch(url, { follow: true }); // input diff string
  patch = await response.text();
} else {
  header += "  " + chalk.gray("processing file " + url);
  console.log(header);
  patch = await fs.readFile(url, "utf8");
}

if (!patch) {
  throw new Error(`Could not read patch file: ${url}`);
}

const summary = await summarize(patch);
console.log(summary);
