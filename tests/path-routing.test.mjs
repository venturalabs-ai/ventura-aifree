import test from "node:test";
import assert from "node:assert/strict";

async function loadConstants(mode, suffix) {
  process.env.NODE_ENV = mode;
  return import(`../src/lib/constants.ts?${suffix}`);
}

test("development paths stay rooted without repository prefix", async () => {
  const { pathFor } = await loadConstants("development", "dev");
  assert.equal(pathFor("cadastro/"), "/cadastro/");
  assert.equal(pathFor("/mapa/"), "/mapa/");
});

test("production paths include the GitHub Pages repository prefix", async () => {
  const { pathFor } = await loadConstants("production", "prod");
  assert.equal(pathFor("cadastro/"), "/ventura-aifree/cadastro/");
  assert.equal(pathFor("/mapa/"), "/ventura-aifree/mapa/");
});
