// SPDX-License-Identifier: MIT
// make.fun bounty entry: One-Star Review of Something Essential
// Writes a single-line, deadpan one-star review (1-160 chars) to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt for local testing).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "★☆☆☆☆ Gravity. Works 24/7 with no off switch and drops everything I own. Worst employee I have ever had, somehow never fired.";

function validate(text: string): void {
  const length = [...text].length; // code points, per the gate
  if (length < 1 || length > 160) {
    throw new Error(`entry must be 1-160 characters, got ${length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validate(TEXT);

const outDir = process.env.OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
console.log(`wrote entry.txt (${[...TEXT].length} chars) to ${outDir}`);
