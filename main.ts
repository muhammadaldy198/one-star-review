// One-Star Review of Something Essential (make.fun): one deadpan
// one-star review, at most 160 characters, of an everyday essential
// everyone relies on. The program writes the review to
// /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
//
// The review is a ledger, not a rant: sleep takes eight hours every
// night and hands back zero rest, so the reviewer files the only
// verdict a review can give — false advertising. Sleep is the
// sponsor's own example of an essential, the grievance is the one
// every sleeper recognises (a full night that restores nothing),
// and the sting lands in the last two words.
const REVIEW =
  "★☆☆☆☆ — Sleep: eight hours in, zero rest out. False advertising.";

const OUT_PATH = "/output/entry.txt";
const MAX_CHARS = 160;
const RATING_PREFIX = "★☆☆☆☆ — ";

function countCodePoints(text: string): number {
  return [...text].length;
}

function assertGate(text: string): void {
  const chars = countCodePoints(text);
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`review must be 1-${MAX_CHARS} characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("review must not be only white space");
  }
  if (!text.startsWith(RATING_PREFIX)) {
    throw new Error("review must open with the one-star rating");
  }
  if (/[\u0000-\u001f\u007f]/.test(text)) {
    throw new Error("review must be a single line without control characters");
  }
}

function writeReview(): void {
  assertGate(REVIEW);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, REVIEW, "utf8");
  const back = readFileSync(OUT_PATH, "utf8");
  if (back !== REVIEW) {
    throw new Error("read-back mismatch: entry.txt differs from REVIEW");
  }
  console.log(
    `wrote ${OUT_PATH} (${countCodePoints(REVIEW)} chars, ${Buffer.byteLength(REVIEW, "utf8")} bytes)`,
  );
}

writeReview();
