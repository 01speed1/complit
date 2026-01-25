import { createFileRoute, redirect, Outlet, Link } from "@tanstack/react-router"
import type { RouterContext, User } from "@/main"

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context }) => {
    const { checkAuthStatus } = context as RouterContext
    const user = await checkAuthStatus()

    if (!user) {
      throw redirect({
        to: "/login",
      })
    }

    return { user }
  },
  component: AuthLayout,
})

function AuthLayout() {
  const { user } = Route.useRouteContext() as { user: User }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <nav className="flex gap-4">
            <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">{user?.email}</span>
            <Link to="/logout" className="text-red-600 hover:text-red-800 text-sm">
              Logout
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
