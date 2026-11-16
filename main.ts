// main.ts — harness driver for the markdown-render-speed-02 entry.
//
// Reads the case set from the input directory, renders every case with the
// parser in parse.js, and writes the HTML strings, in input order, to the
// output directory. Only Node.js built-in modules are used and the output
// is a pure function of the input, so two runs are byte-identical.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "./parse.js";

interface CaseInput {
  id: string;
  markdown: string;
}

const inputDir: string = process.env.MAKEFUN_INPUT_DIR ?? "/input";
const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const raw: string = readFileSync(join(inputDir, "cases.json"), "utf8");
const cases: CaseInput[] = JSON.parse(raw) as CaseInput[];

const html: string[] = new Array<string>(cases.length);
for (let i = 0; i < cases.length; i++) {
  html[i] = parse(cases[i].markdown);
}

writeFileSync(join(outputDir, "html.json"), JSON.stringify(html));
