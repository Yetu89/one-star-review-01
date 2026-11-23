// SPDX-License-Identifier: MIT
// make.fun bounty entry: One-Star Review of Something Essential
// Writes a single-line, deadpan one-star review (1-160 chars) to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt for local testing).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "★☆☆☆☆ Gravity. Works 24/7 with no off switch and drops everything I own. Worst employee I have ever had, somehow never fired.";

const MAX_CHARS = 160;

function validate(text: string): number {
  const length = [...text].length; // code points, per the gate
  if (length < 1 || length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (/[\n\r]/.test(text)) {
    throw new Error("entry must be a single line");
  }
  return length;
}

const charCount = validate(TEXT);

const outDir = process.env.OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
console.log(`wrote entry.txt (${charCount} chars) to ${outDir}`);
