import { createFileRoute, Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import type { User, RouterContext } from "@/main"

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  const context = Route.useRouteContext() as RouterContext
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const authUser = await context.checkAuthStatus()
      setUser(authUser)
      setIsLoading(false)
    }
    checkAuth()
  }, [context])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Complit</h1>

      {user ? (
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Welcome back, <span className="font-semibold">{user.name || user.email}</span>
          </p>
          <div className="flex gap-4">
            <Link
              to="/dashboard"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/logout"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Logout
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-gray-600">Track your goals and milestones</p>
          <Link
            to="/login"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  )
}
