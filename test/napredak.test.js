import assert from "node:assert/strict";
import test from "node:test";
import { postotakNapretka } from "../script.js";

test("prazan popis počinje s nula posto", () => {
  assert.equal(postotakNapretka(0, 0), 0);
});

test("napredak prati završene zadatke", () => {
  assert.equal(postotakNapretka(1, 4), 25);
  assert.equal(postotakNapretka(3, 4), 75);
  assert.equal(postotakNapretka(4, 4), 100);
});
