import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"

const API_BASE = "/api"

export const Route = createFileRoute("/_auth/goals/new")({
  component: NewGoal,
})

function NewGoal() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const durationRawValue = formData.get("durationInMonths") as string

    const body = {
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || undefined,
      targetDescription: (formData.get("targetDescription") as string) || undefined,
      durationInMonths: durationRawValue ? Number(durationRawValue) : undefined,
      priority: formData.get("priority") as "low" | "medium" | "high",
    }

    const response = await fetch(`${API_BASE}/goals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    })

    if (response.ok) {
      navigate({ to: "/dashboard" })
    } else {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold mb-6 text-center">Create a new Goal</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-semibold mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter goal title"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-semibold mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter goal description"
              rows={3}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="targetDescription" className="text-sm font-semibold mb-1">Target description</label>
            <input
              type="text"
              id="targetDescription"
              name="targetDescription"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="How will you know this goal is complete?"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="durationInMonths" className="text-sm font-semibold mb-1">Duration (months)</label>
              <input
                type="number"
                id="durationInMonths"
                name="durationInMonths"
                min="1"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g. 3"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="priority" className="text-sm font-semibold mb-1">Priority</label>
              <select
                id="priority"
                name="priority"
                defaultValue="medium"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Goal"}
            </button>
            <Link
              to="/dashboard"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition text-center"
            >
              Back to Dashboard
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
