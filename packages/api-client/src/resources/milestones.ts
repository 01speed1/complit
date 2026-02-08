import type { HttpClient } from "../http-client.ts"
import type { Milestone, CreateMilestonePayload, UpdateMilestonePayload } from "../types.ts"

export function createMilestonesResource(http: HttpClient) {
  return {
    async getAll(goalId: string): Promise<Milestone[]> {
      return http.get<Milestone[]>(`/goals/${goalId}/milestones`)
    },

    async create(goalId: string, payload: CreateMilestonePayload): Promise<Milestone> {
      return http.post<Milestone>(`/goals/${goalId}/milestones`, payload)
    },

    async update(goalId: string, milestoneId: string, payload: UpdateMilestonePayload): Promise<Milestone> {
      return http.patch<Milestone>(`/goals/${goalId}/milestones/${milestoneId}`, payload)
    },

    async remove(goalId: string, milestoneId: string): Promise<void> {
      await http.delete(`/goals/${goalId}/milestones/${milestoneId}`)
    },
  }
}
