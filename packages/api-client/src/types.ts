export type GoalPriority = "low" | "medium" | "high"
export type GoalStatus = "active" | "completed" | "paused"
export type MilestoneStatus = "pending" | "in_progress" | "completed"

export interface User {
  id: string
  email?: string
  name?: string
}

export interface Goal {
  id: string
  title: string
  description: string | null
  targetDescription: string | null
  durationInMonths: number | null
  priority: GoalPriority
  status: GoalStatus
  order: number
  createdAt: string
  completedAt: string | null
}

export interface Milestone {
  id: string
  goalId: string
  title: string
  description: string | null
  status: MilestoneStatus
  order: number
  createdAt: string
  completedAt: string | null
}

export interface Evidence {
  id: string
  goalId: string
  milestoneId: string | null
  content: string
  createdAt: string
  updatedAt: string
}

export interface CreateGoalPayload {
  title: string
  description?: string
  targetDescription?: string
  durationInMonths?: number
  priority: GoalPriority
}

export interface UpdateGoalPayload {
  title?: string
  description?: string | null
  targetDescription?: string | null
  durationInMonths?: number | null
  priority?: GoalPriority
  status?: GoalStatus
  order?: number
}

export interface CreateMilestonePayload {
  title: string
  description?: string
}

export interface UpdateMilestonePayload {
  title?: string
  description?: string | null
  status?: MilestoneStatus
  order?: number
}

export interface CreateEvidencePayload {
  content: string
  milestoneId?: string
}

export interface UpdateEvidencePayload {
  content: string
}
