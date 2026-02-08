import type { HttpClient } from "../http-client.ts"
import type { User } from "../types.ts"

export function createAuthResource(http: HttpClient, baseUrl: string) {
  return {
    async getCurrentUser(): Promise<User | null> {
      try {
        const payload = await http.get<{ user: User | null }>("/auth/me")
        return payload.user ?? null
      } catch {
        return null
      }
    },

    async logout(): Promise<void> {
      await http.post("/auth/logout")
    },

    getLoginUrl(): string {
      return `${baseUrl}/auth/better`
    },
  }
}
