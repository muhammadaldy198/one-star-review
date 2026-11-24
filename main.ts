// One-Star Review of Something Essential (make.fun): a deadpan
// one-star review, at most 160 characters, of an everyday essential
// everyone relies on. This entry reviews ears: they pick up the
// neighbour's television through two walls yet miss a name called
// from the next room — the grievance is the ears' own backwards
// priorities, filed deadpan with no winking and no exclamation.
// The program writes the review to
// /output/entry.txt.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "★☆☆☆☆ — Ears: hear the neighbour's TV through two walls, but not my name from the next room.";
const OUTPUT_FILE = "/output/entry.txt";
const CHAR_LIMIT = 160;

function lengthInChars(text: string): number {
  return Array.from(text).length;
}

function checkEntry(text: string): void {
  const chars = lengthInChars(text);
  if (chars < 1 || chars > CHAR_LIMIT) {
    throw new Error(`entry must be 1-${CHAR_LIMIT} characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (/[\u0000-\u001f\u007f]/.test(text)) {
    throw new Error("entry must be a single line without control characters");
  }
  if (!text.startsWith("★☆☆☆☆ — ")) {
    throw new Error("entry must open with the one-star rating");
  }
  if (!text.endsWith(".")) {
    throw new Error("entry must end with a full stop");
  }
}

function main(): void {
  checkEntry(ENTRY);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_FILE, ENTRY, { encoding: "utf8", mode: 0o644 });
  chmodSync(OUTPUT_FILE, 0o644);
  const back = readFileSync(OUTPUT_FILE, "utf8");
  if (back !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt differs from ENTRY");
  }
  console.log(
    `wrote ${OUTPUT_FILE}: ${lengthInChars(ENTRY)} chars, ${Buffer.byteLength(ENTRY, "utf8")} bytes, no trailing newline`,
  );
}

main();
