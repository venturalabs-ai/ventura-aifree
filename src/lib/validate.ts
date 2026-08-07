import type { AITool } from "./types";

const HTTPS = /^https:\/\//i;

export function isHttpsUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateAiTool(tool: AITool): string[] {
  const errors: string[] = [];
  if (!tool.id?.trim()) errors.push("id required");
  if (!tool.name?.trim()) errors.push("name required");
  if (!tool.url || !isHttpsUrl(tool.url)) errors.push("url must be https");
  if (!tool.category?.trim()) errors.push("category required");
  return errors;
}

export function validateCatalog(tools: AITool[]): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const t of tools) {
    const e = validateAiTool(t);
    if (e.length) errors.push(`${t.id || "?"}: ${e.join(", ")}`);
    if (t.id && ids.has(t.id)) errors.push(`duplicate id: ${t.id}`);
    if (t.id) ids.add(t.id);
  }
  return { ok: errors.length === 0, errors };
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
