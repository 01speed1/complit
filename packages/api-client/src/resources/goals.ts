import type { HttpClient } from "../http-client.ts"
import type { Goal, CreateGoalPayload, UpdateGoalPayload } from "../types.ts"

export function createGoalsResource(http: HttpClient) {
  return {
    async getAll(): Promise<Goal[]> {
      return http.get<Goal[]>("/goals")
    },

    async getById(goalId: string): Promise<Goal> {
      return http.get<Goal>(`/goals/${goalId}`)
    },

    async create(payload: CreateGoalPayload): Promise<Goal> {
      return http.post<Goal>("/goals", payload)
    },

    async update(goalId: string, payload: UpdateGoalPayload): Promise<Goal> {
      return http.patch<Goal>(`/goals/${goalId}`, payload)
    },

    async remove(goalId: string): Promise<void> {
      await http.delete(`/goals/${goalId}`)
    },
  }
}
