import test from "node:test";
import assert from "node:assert/strict";
import { isHttpsUrl, isValidEmail, validateCatalog } from "../src/lib/validate.ts";

test("https validation rejects insecure and malformed URLs", () => {
  assert.equal(isHttpsUrl("https://chatgpt.com/"), true);
  assert.equal(isHttpsUrl("http://insecure.example"), false);
  assert.equal(isHttpsUrl("not-a-url"), false);
});

test("catalog validation accepts valid unique entries and rejects duplicate ids", () => {
  const valid = [
    { id: "one", name: "One", url: "https://one.example", category: "assistant" },
    { id: "two", name: "Two", url: "https://two.example", category: "research" },
  ];
  assert.deepEqual(validateCatalog(valid), { ok: true, errors: [] });

  const duplicate = [...valid, { id: "one", name: "Duplicate", url: "https://duplicate.example", category: "assistant" }];
  const result = validateCatalog(duplicate);
  assert.equal(result.ok, false);
  assert.ok(result.errors.includes("duplicate id: one"));
});

test("email validation covers valid and invalid basic addresses", () => {
  assert.equal(isValidEmail("user@example.com"), true);
  assert.equal(isValidEmail("bad"), false);
});
