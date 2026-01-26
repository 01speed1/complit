import type { FastifyInstance } from "fastify";
import { db } from "../db/client.ts";
import { evidence, goals } from "../db/schema.ts";
import { eq, and, asc } from "drizzle-orm";
import { generateId } from "../lib/utils.ts";

type Params = {
  id: string;
};

type QueryParams = {
  goalId?: string;
};

type CreateEvidenceBody = {
  goalId: string;
  milestoneId?: string | null;
  content: string;
};

type UpdateEvidenceBody = {
  content?: string;
  milestoneId?: string | null;
};

export default async function (fastify: FastifyInstance) {
  fastify.get<{ Querystring: QueryParams }>("/", async (request) => {
    const userId = request.userId!;
    const { goalId } = request.query;

    let query = db
      .select({
        id: evidence.id,
        goalId: evidence.goalId,
        milestoneId: evidence.milestoneId,
        content: evidence.content,
        createdAt: evidence.createdAt,
        updatedAt: evidence.updatedAt,
      })
      .from(evidence)
      .innerJoin(goals, eq(evidence.goalId, goals.id))
      .where(eq(goals.userId, userId))
      .orderBy(asc(evidence.createdAt));

    const evidenceList = await query;

    if (goalId) {
      return evidenceList.filter((e: { goalId: string }) => e.goalId === goalId);
    }

    return evidenceList;
  });

  fastify.get<{ Params: Params }>("/:id", async (request, reply) => {
    const userId = request.userId!;
    const { id } = request.params;

    const result = await db
      .select({
        id: evidence.id,
        goalId: evidence.goalId,
        milestoneId: evidence.milestoneId,
        content: evidence.content,
        createdAt: evidence.createdAt,
        updatedAt: evidence.updatedAt,
      })
      .from(evidence)
      .innerJoin(goals, eq(evidence.goalId, goals.id))
      .where(and(eq(evidence.id, id), eq(goals.userId, userId)))
      .limit(1);

    if (result.length === 0) {
      return reply.status(404).send({ message: "Evidence not found" });
    }

    return result[0];
  });

  fastify.post<{ Body: CreateEvidenceBody }>(
    "/",
    async (request, reply) => {
      const userId = request.userId!;
      const body = request.body;

      if (!body?.goalId || !body?.content) {
        return reply
          .status(400)
          .send({ message: "goalId and content are required" });
      }

      const goalResult = await db
        .select()
        .from(goals)
        .where(and(eq(goals.id, body.goalId), eq(goals.userId, userId)))
        .limit(1);

      if (goalResult.length === 0) {
        return reply.status(404).send({ message: "Goal not found" });
      }

      const newEvidence = await db
        .insert(evidence)
        .values({
          id: generateId("e"),
          goalId: body.goalId,
          milestoneId: body.milestoneId ?? null,
          content: body.content,
        })
        .returning();

      return reply.status(201).send(newEvidence[0]);
    }
  );

  fastify.put<{ Params: Params; Body: UpdateEvidenceBody }>(
    "/:id",
    async (request, reply) => {
      const userId = request.userId!;
      const { id } = request.params;
      const body = request.body;

      const existingResult = await db
        .select({ goalId: evidence.goalId })
        .from(evidence)
        .innerJoin(goals, eq(evidence.goalId, goals.id))
        .where(and(eq(evidence.id, id), eq(goals.userId, userId)))
        .limit(1);

      if (existingResult.length === 0) {
        return reply.status(404).send({ message: "Evidence not found" });
      }

      const updated = await db
        .update(evidence)
        .set({
          ...body,
          updatedAt: new Date(),
        })
        .where(eq(evidence.id, id))
        .returning();

      return updated[0];
    }
  );
}
