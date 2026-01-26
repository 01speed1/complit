import crypto from "node:crypto";

export function generateId(prefix?: string): string {
  const id = crypto.randomBytes(12).toString("hex");
  return prefix ? `${prefix}_${id}` : id;
}

export function generateSessionId(): string {
  return generateId("s");
}
