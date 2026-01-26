import type { FastifyRequest, FastifyReply } from "fastify";
import { db } from "../db/client.ts";
import { sessions } from "../db/schema.ts";
import { eq } from "drizzle-orm";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const sessionId = request.cookies?.session_id as string | undefined;

  if (!sessionId) {
    return reply.status(401).send({ error: "Unauthorized" });
  }

  const result = await db
    .select({ userId: sessions.userId })
    .from(sessions)
    .where(eq(sessions.id, sessionId))
    .limit(1);

  if (result.length === 0) {
    return reply.status(401).send({ error: "Invalid session" });
  }

  request.userId = result[0].userId;
}
