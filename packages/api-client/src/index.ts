import { createHttpClient } from "./http-client.ts"
import { createAuthResource } from "./resources/auth.ts"
import { createGoalsResource } from "./resources/goals.ts"
import { createMilestonesResource } from "./resources/milestones.ts"
import { createEvidenceResource } from "./resources/evidence.ts"

export { ApiError } from "./http-client.ts"
export type { HttpClient } from "./http-client.ts"
export type * from "./types.ts"

export function createApiClient(baseUrl = "/api") {
  const http = createHttpClient(baseUrl)

  return {
    auth: createAuthResource(http, baseUrl),
    goals: createGoalsResource(http),
    milestones: createMilestonesResource(http),
    evidence: createEvidenceResource(http),
  }
}

export type ApiClient = ReturnType<typeof createApiClient>
