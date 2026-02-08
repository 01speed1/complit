import { createFileRoute, Link } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import type { User } from "@/main"

const API_BASE = "/api"

interface Goal {
  id: string
  title: string
  description: string | null
  targetDescription: string | null
  durationInMonths: number | null
  priority: "low" | "medium" | "high"
  status: "active" | "completed" | "paused"
  order: number
  createdAt: string
  completedAt: string | null
}

export const Route = createFileRoute("/_auth/dashboard")({
  component: Dashboard,
})

const PRIORITY_STYLES: Record<Goal["priority"], string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700",
}

const STATUS_STYLES: Record<Goal["status"], string> = {
  active: "bg-blue-100 text-blue-700",
  paused: "bg-gray-100 text-gray-500",
  completed: "bg-green-100 text-green-700",
}

function GoalCard({ goal }: { goal: Goal }) {
  const createdDate = new Date(goal.createdAt)
  const daysSinceCreation = Math.floor(
    (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <Link
      to="/dashboard"
      className="block bg-white shadow-md rounded-lg p-6 mb-3 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold capitalize">{goal.title}</h3>
        <div className="flex gap-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${PRIORITY_STYLES[goal.priority]}`}>
            {goal.priority}
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_STYLES[goal.status]}`}>
            {goal.status}
          </span>
        </div>
      </div>

      {goal.description && (
        <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
      )}

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>Created {daysSinceCreation} day{daysSinceCreation !== 1 ? "s" : ""} ago</span>
        {goal.durationInMonths && (
          <span>Duration: {goal.durationInMonths} month{goal.durationInMonths !== 1 ? "s" : ""}</span>
        )}
        {goal.completedAt && (
          <span>Completed: {new Date(goal.completedAt).toLocaleDateString()}</span>
        )}
      </div>

      {goal.targetDescription && (
        <div className="mt-3 text-sm bg-gray-50 rounded p-2 text-gray-600">
          <span className="font-medium">Target:</span> {goal.targetDescription}
        </div>
      )}
    </Link>
  )
}

function Dashboard() {
  const { user } = Route.useRouteContext() as { user: User }
  const [goals, setGoals] = useState<Goal[]>([])
  const [isLoadingGoals, setIsLoadingGoals] = useState(true)

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch(`${API_BASE}/goals`, { credentials: "include" })
        if (response.ok) {
          const data = await response.json()
          setGoals(data)
        }
      } finally {
        setIsLoadingGoals(false)
      }
    }
    fetchGoals()
  }, [])

  const activeGoals = goals.filter((goal) => goal.status === "active")
  const pausedGoals = goals.filter((goal) => goal.status === "paused")
  const completedGoals = goals.filter((goal) => goal.status === "completed")

  return (
    <div className="mx-auto max-w-3xl">
      <div className="bg-orange-400 text-white rounded-lg px-6 py-2 mb-4 text-md">
        Welcome
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-2xl font-bold text-gray-500">
            {user?.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{user?.name || "User"}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Goals</h2>
        <Link
          to="/goals/new"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Add new Goal
        </Link>
      </div>

      {isLoadingGoals && (
        <div className="bg-white shadow-md rounded-lg p-6 text-center text-gray-500">
          Loading goals...
        </div>
      )}

      {!isLoadingGoals && goals.length === 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-xl font-semibold mb-2">There isn't a goal yet</p>
          <p className="text-sm text-gray-500">Create one to get started</p>
        </div>
      )}

      {activeGoals.length > 0 && (
        <section className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Active</h3>
          {activeGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </section>
      )}

      {pausedGoals.length > 0 && (
        <section className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Paused</h3>
          {pausedGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </section>
      )}

      {completedGoals.length > 0 && (
        <section className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Completed</h3>
          {completedGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </section>
      )}
    </div>
  )
}
