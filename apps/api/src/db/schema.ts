import { pgTable, varchar, text, integer, timestamp, pgEnum, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);
export const goalStatusEnum = pgEnum("goal_status", ["active", "completed", "paused"]);
export const milestoneStatusEnum = pgEnum("milestone_status", ["pending", "in_progress", "completed"]);

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  email: varchar("email").notNull().unique(),
  name: varchar("name"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  emailIdx: index("users_email_idx").on(table.email),
}));

export const goals = pgTable("goals", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  title: varchar("title").notNull(),
  description: text("description"),
  targetDescription: text("target_description"),
  durationInMonths: integer("duration_in_months"),
  priority: priorityEnum("priority").default("medium"),
  status: goalStatusEnum("status").default("active"),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
}, (table) => ({
  userIdIdx: index("goals_user_id_idx").on(table.userId),
  userIdStatusIdx: index("goals_user_id_status_idx").on(table.userId, table.status),
}));

export const milestones = pgTable("milestones", {
  id: varchar("id").primaryKey(),
  goalId: varchar("goal_id").notNull().references(() => goals.id),
  title: varchar("title").notNull(),
  description: text("description"),
  status: milestoneStatusEnum("status").default("pending"),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
}, (table) => ({
  goalIdIdx: index("milestones_goal_id_idx").on(table.goalId),
}));

export const evidence = pgTable("evidence", {
  id: varchar("id").primaryKey(),
  goalId: varchar("goal_id").notNull().references(() => goals.id),
  milestoneId: varchar("milestone_id").references(() => milestones.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
}, (table) => ({
  goalIdIdx: index("evidence_goal_id_idx").on(table.goalId),
  goalIdMilestoneIdIdx: index("evidence_goal_id_milestone_id_idx").on(table.goalId, table.milestoneId),
}));

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  userIdIdx: index("sessions_user_id_idx").on(table.userId),
}));

export const usersRelations = relations(users, ({ many }) => ({
  goals: many(goals),
  sessions: many(sessions),
}));

export const goalsRelations = relations(goals, ({ one, many }) => ({
  user: one(users, {
    fields: [goals.userId],
    references: [users.id],
  }),
  milestones: many(milestones),
  evidence: many(evidence),
}));

export const milestonesRelations = relations(milestones, ({ one, many }) => ({
  goal: one(goals, {
    fields: [milestones.goalId],
    references: [goals.id],
  }),
  evidence: many(evidence),
}));

export const evidenceRelations = relations(evidence, ({ one }) => ({
  goal: one(goals, {
    fields: [evidence.goalId],
    references: [goals.id],
  }),
  milestone: one(milestones, {
    fields: [evidence.milestoneId],
    references: [milestones.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Goal = typeof goals.$inferSelect;
export type NewGoal = typeof goals.$inferInsert;
export type Milestone = typeof milestones.$inferSelect;
export type NewMilestone = typeof milestones.$inferInsert;
export type Evidence = typeof evidence.$inferSelect;
export type NewEvidence = typeof evidence.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
