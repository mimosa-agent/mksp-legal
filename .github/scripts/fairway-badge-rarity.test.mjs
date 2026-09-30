import assert from "node:assert/strict";
import { test } from "node:test";

import { buildRarity, MIN_GOLFERS, sameContent } from "./fairway-badge-rarity.mjs";

const now = new Date("2026-10-05T03:17:00Z");

test("no percentages below the minimum number of golfers", () => {
  const r = buildRarity(MIN_GOLFERS - 1, { range_days_1: 80 }, now);
  assert.equal(r.ready, false);
  assert.deepEqual(r.pct, {});
});

test("rounded percentages from the minimum up, capped at 100", () => {
  const r = buildRarity(200, { range_days_1: 150, hat_trick: 7, weird: 900 }, now);
  assert.equal(r.ready, true);
  assert.deepEqual(r.pct, { hat_trick: 3.5, range_days_1: 75, weird: 100 });
});

test("ignores ids that aren't badge ids", () => {
  const r = buildRarity(100, { "<script>": 5, ok_id: 1 }, now);
  assert.deepEqual(r.pct, { ok_id: 1 });
});

test("only the date changing is not a change", () => {
  const a = buildRarity(150, { a: 3 }, now);
  const b = buildRarity(150, { a: 3 }, new Date("2026-10-12T03:17:00Z"));
  assert.equal(sameContent(a, b), true);
  assert.equal(sameContent(a, buildRarity(150, { a: 4 }, now)), false);
  assert.equal(sameContent(null, a), false);
});
