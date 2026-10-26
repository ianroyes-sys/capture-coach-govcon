import assert from "node:assert/strict";
import test from "node:test";
import { defaultRatings, scorePursuit } from "./scoring.ts";

test("default pursuit returns a transparent conditional recommendation", () => {
  const result = scorePursuit(defaultRatings);
  assert.deepEqual(result, { score: 64, confidence: 83, recommendation: "Conditional bid" });
});

test("strong evidence earns a bid recommendation", () => {
  const result = scorePursuit({ fit: 5, customer: 5, access: 5, solution: 5, competition: 5, economics: 5, delivery: 5 });
  assert.deepEqual(result, { score: 100, confidence: 100, recommendation: "Bid" });
});

test("weak evidence produces a no-bid recommendation", () => {
  const result = scorePursuit({ fit: 1, customer: 1, access: 1, solution: 1, competition: 1, economics: 1, delivery: 1 });
  assert.equal(result.recommendation, "No-bid");
});
