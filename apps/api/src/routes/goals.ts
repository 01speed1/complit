import type { FastifyInstance } from "fastify";
import { db } from "../db/client.ts";
import { goals } from "../db/schema.ts";
import { eq, and, max } from "drizzle-orm";
import { generateId } from "../lib/utils.ts";

type Params = {
  id: string;
};

type CreateGoalBody = {
  title: string;
  description?: string;
  targetDescription?: string;
  durationInMonths?: number;
  priority?: "low" | "medium" | "high";
};

type UpdateGoalBody = {
  title?: string;
  description?: string;
  targetDescription?: string;
  durationInMonths?: number;
  priority?: "low" | "medium" | "high";
  status?: "active" | "completed" | "paused";
  completedAt?: string | null;
  order?: number;
};

export default async function (fastify: FastifyInstance) {
  fastify.get("/", async (request) => {
    const userId = request.userId!;

    const userGoals = await db
      .select()
      .from(goals)
      .where(eq(goals.userId, userId))
      .orderBy(goals.order);

    return userGoals;
  });

  fastify.get<{ Params: Params }>("/:id", async (request, reply) => {
    const userId = request.userId!;
    const { id } = request.params;

    const result = await db
      .select()
      .from(goals)
      .where(and(eq(goals.id, id), eq(goals.userId, userId)))
      .limit(1);

    if (result.length === 0) {
      return reply.status(404).send({ message: "Goal not found" });
    }

    return result[0];
  });

  fastify.post<{ Body: CreateGoalBody }>("/", async (request, reply) => {
    const userId = request.userId!;
    const body = request.body;

    if (!body?.title) {
      return reply.status(400).send({ message: "Title is required" });
    }

    const maxOrderResult = await db
      .select({ maxOrder: max(goals.order) })
      .from(goals)
      .where(eq(goals.userId, userId));

    const nextOrder = (maxOrderResult[0]?.maxOrder ?? -1) + 1;

    const newGoal = await db
      .insert(goals)
      .values({
        id: generateId("g"),
        userId,
        title: body.title,
        description: body.description,
        targetDescription: body.targetDescription,
        durationInMonths: body.durationInMonths,
        priority: body.priority ?? "medium",
        status: "active",
        order: nextOrder,
      })
      .returning();

    return reply.status(201).send(newGoal[0]);
  });

  fastify.put<{ Params: Params; Body: UpdateGoalBody }>(
    "/:id",
    async (request, reply) => {
      const userId = request.userId!;
      const { id } = request.params;
      const body = request.body;

      const updateData: any = { ...body };
      if (typeof updateData.completedAt === "string") {
        updateData.completedAt = new Date(updateData.completedAt);
      }

      const updated = await db
        .update(goals)
        .set(updateData)
        .where(and(eq(goals.id, id), eq(goals.userId, userId)))
        .returning();

      if (updated.length === 0) {
        return reply.status(404).send({ message: "Goal not found" });
      }

      return updated[0];
    },
  );

  fastify.delete<{ Params: Params }>("/:id", async (request, reply) => {
    const userId = request.userId!;
    const { id } = request.params;

    const deleted = await db
      .delete(goals)
      .where(and(eq(goals.id, id), eq(goals.userId, userId)))
      .returning();

    if (deleted.length === 0) {
      return reply.status(404).send({ message: "Goal not found" });
    }

    return reply.status(204).send();
  });
}
