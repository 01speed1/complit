import type { HttpClient } from "../http-client.ts"
import type { Evidence, CreateEvidencePayload, UpdateEvidencePayload } from "../types.ts"

export function createEvidenceResource(http: HttpClient) {
  return {
    async getAll(goalId: string): Promise<Evidence[]> {
      return http.get<Evidence[]>(`/goals/${goalId}/evidence`)
    },

    async create(goalId: string, payload: CreateEvidencePayload): Promise<Evidence> {
      return http.post<Evidence>(`/goals/${goalId}/evidence`, payload)
    },

    async update(goalId: string, evidenceId: string, payload: UpdateEvidencePayload): Promise<Evidence> {
      return http.patch<Evidence>(`/goals/${goalId}/evidence/${evidenceId}`, payload)
    },
  }
}
