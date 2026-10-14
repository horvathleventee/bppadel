import assert from "node:assert/strict";
import ts from "typescript";
import { readFile } from "node:fs/promises";
const source = await readFile("src/lib/shot-motion.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;
const { shotAt, CONTACT } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
assert.deepEqual(shotAt(-1), shotAt(0));
assert.deepEqual(shotAt(2), shotAt(1));
assert.equal(shotAt(CONTACT).x, 91);
assert.equal(shotAt(CONTACT).y, 28);
assert.equal(shotAt(CONTACT).impact, 1);
for (let p = 0; p <= 1; p += 0.005) {
  const s = shotAt(p);
  for (const key of [
    "x",
    "y",
    "ballScale",
    "playerRotate",
    "ballOpacity",
    "impact",
  ])
    assert.ok(Number.isFinite(s[key]));
  assert.ok(s.ballOpacity >= 0 && s.ballOpacity <= 1);
  assert.ok(s.ballScale > 0);
}
for (const delta of [-0.00001, 0.00001]) {
  const a = shotAt(CONTACT + delta);
  assert.ok(Math.abs(a.x - 91) < 0.01);
  assert.ok(Math.abs(a.y - 28) < 0.01);
}
assert.ok(shotAt(0.9).x < shotAt(0.6).x);
assert.ok(shotAt(0.9).ballScale > shotAt(0.6).ballScale);
assert.deepEqual(shotAt(0.3), shotAt(0.3));
console.log(
  "PASS: shot contact alignment, trajectory continuity, clamping, finite transforms, ball scale and opacity bounds.",
);
