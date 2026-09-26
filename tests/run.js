import assert from "node:assert";
import { isComment } from "../judge.js";
import { commentRatio } from "../ratio.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("isComment returns a boolean", () => {
  assert.strictEqual(typeof isComment("# a", "#"), "boolean");
});

check("commentRatio returns flags", () => {
  assert.ok(Array.isArray(commentRatio(["a"], "#").flags));
});

check("commentRatio returns comments", () => {
  assert.strictEqual(typeof commentRatio(["a"], "#").comments, "number");
});

check("render counts lines", () => {
  assert.strictEqual(typeof render({ lines: ["a"], mark: "#" }).count, "number");
});

check("render exposes basis points", () => {
  assert.strictEqual(typeof render({ lines: ["a"], mark: "#" }).basis_points, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
