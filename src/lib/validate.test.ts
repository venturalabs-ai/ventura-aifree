import { describe, expect, it } from "vitest";
import { aiTools } from "@/data/ais";
import { isHttpsUrl, isValidEmail, validateCatalog } from "./validate";

describe("isHttpsUrl", () => {
  it("accepts https", () => {
    expect(isHttpsUrl("https://chatgpt.com/")).toBe(true);
  });
  it("rejects http", () => {
    expect(isHttpsUrl("http://insecure.example")).toBe(false);
  });
});

describe("validateCatalog", () => {
  it("catalog is valid and unique", () => {
    const result = validateCatalog(aiTools);
    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
    expect(aiTools.length).toBeGreaterThanOrEqual(5);
  });
});

describe("isValidEmail", () => {
  it("validates basic emails", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("bad")).toBe(false);
  });
});
