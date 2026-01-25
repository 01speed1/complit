import { createFileRoute } from "@tanstack/react-router"
import type { User } from "@/main"

export const Route = createFileRoute("/_auth/dashboard")({
  component: Dashboard,
})

function Dashboard() {
  const { user } = Route.useRouteContext() as { user: User }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">User Information</h2>
        <dl className="space-y-3">
          <div className="flex">
            <dt className="w-24 text-gray-500">ID:</dt>
            <dd className="text-gray-900 font-mono text-sm">{user?.id}</dd>
          </div>
          <div className="flex">
            <dt className="w-24 text-gray-500">Name:</dt>
            <dd className="text-gray-900">{user?.name || "N/A"}</dd>
          </div>
          <div className="flex">
            <dt className="w-24 text-gray-500">Email:</dt>
            <dd className="text-gray-900">{user?.email || "N/A"}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
