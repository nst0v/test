import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("static export contains Nastya's letter", async () => {
  const html = await readFile(new URL("../dist/client/index.html", import.meta.url), "utf8");

  assert.match(html, /Настя/);
  assert.match(html, /Три дня под одним небом/);
  assert.match(html, /свидание/);
  assert.doesNotMatch(html, /codex-preview/);
});
