import type { FastifyInstance } from "fastify";
import { db } from "../db/client.ts";
import { milestones, goals } from "../db/schema.ts";
import { eq, and, max } from "drizzle-orm";
import { generateId } from "../lib/utils.ts";

type Params = {
  id: string;
};

type CreateMilestoneBody = {
  goalId: string;
  title: string;
  description?: string;
};

type UpdateMilestoneBody = {
  title?: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
  completedAt?: string | null;
  order?: number;
};

export default async function (fastify: FastifyInstance) {
  fastify.get("/", async (request) => {
    const userId = request.userId!;

    const userMilestones = await db
      .select({
        id: milestones.id,
        goalId: milestones.goalId,
        title: milestones.title,
        description: milestones.description,
        status: milestones.status,
        order: milestones.order,
        createdAt: milestones.createdAt,
        completedAt: milestones.completedAt,
      })
      .from(milestones)
      .innerJoin(goals, eq(milestones.goalId, goals.id))
      .where(eq(goals.userId, userId))
      .orderBy(milestones.order);

    return userMilestones;
  });

  fastify.get<{ Params: Params }>("/:id", async (request, reply) => {
    const userId = request.userId!;
    const { id } = request.params;

    const result = await db
      .select({
        id: milestones.id,
        goalId: milestones.goalId,
        title: milestones.title,
        description: milestones.description,
        status: milestones.status,
        order: milestones.order,
        createdAt: milestones.createdAt,
        completedAt: milestones.completedAt,
      })
      .from(milestones)
      .innerJoin(goals, eq(milestones.goalId, goals.id))
      .where(and(eq(milestones.id, id), eq(goals.userId, userId)))
      .limit(1);

    if (result.length === 0) {
      return reply.status(404).send({ message: "Milestone not found" });
    }

    return result[0];
  });

  fastify.post<{ Body: CreateMilestoneBody }>(
    "/",
    async (request, reply) => {
      const userId = request.userId!;
      const body = request.body;

      if (!body?.goalId || !body?.title) {
        return reply
          .status(400)
          .send({ message: "goalId and title are required" });
      }

      const goalResult = await db
        .select()
        .from(goals)
        .where(and(eq(goals.id, body.goalId), eq(goals.userId, userId)))
        .limit(1);

      if (goalResult.length === 0) {
        return reply.status(404).send({ message: "Goal not found" });
      }

      const maxOrderResult = await db
        .select({ maxOrder: max(milestones.order) })
        .from(milestones)
        .where(eq(milestones.goalId, body.goalId));

      const nextOrder = (maxOrderResult[0]?.maxOrder ?? -1) + 1;

      const newMilestone = await db
        .insert(milestones)
        .values({
          id: generateId("m"),
          goalId: body.goalId,
          title: body.title,
          description: body.description,
          status: "pending",
          order: nextOrder,
        })
        .returning();

      return reply.status(201).send(newMilestone[0]);
    }
  );

  fastify.put<{ Params: Params; Body: UpdateMilestoneBody }>(
    "/:id",
    async (request, reply) => {
      const userId = request.userId!;
      const { id } = request.params;
      const body = request.body;

      const existingResult = await db
        .select({ goalId: milestones.goalId })
        .from(milestones)
        .innerJoin(goals, eq(milestones.goalId, goals.id))
        .where(and(eq(milestones.id, id), eq(goals.userId, userId)))
        .limit(1);

      if (existingResult.length === 0) {
        return reply.status(404).send({ message: "Milestone not found" });
      }

      const updateData: any = { ...body };
      if (typeof updateData.completedAt === "string") {
        updateData.completedAt = new Date(updateData.completedAt);
      }

      const updated = await db
        .update(milestones)
        .set(updateData)
        .where(eq(milestones.id, id))
        .returning();

      return updated[0];
    }
  );

  fastify.delete<{ Params: Params }>("/:id", async (request, reply) => {
    const userId = request.userId!;
    const { id } = request.params;

    const existingResult = await db
      .select({ goalId: milestones.goalId })
      .from(milestones)
      .innerJoin(goals, eq(milestones.goalId, goals.id))
      .where(and(eq(milestones.id, id), eq(goals.userId, userId)))
      .limit(1);

    if (existingResult.length === 0) {
      return reply.status(404).send({ message: "Milestone not found" });
    }

    await db.delete(milestones).where(eq(milestones.id, id));

    return reply.status(204).send();
  });
}
