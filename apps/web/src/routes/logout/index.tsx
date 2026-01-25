import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"

const API_BASE = (import.meta.env.VITE_API_URL as string) || ""

export const Route = createFileRoute("/logout/")({
  component: LogoutPage,
})

function LogoutPage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending")

  useEffect(() => {
    const performLogout = async () => {
      try {
        await fetch(`${API_BASE}/auth/logout`, {
          method: "POST",
          credentials: "include",
        })
        setStatus("success")
        setTimeout(() => {
          navigate({ to: "/login" })
        }, 500)
      } catch {
        setStatus("error")
      }
    }

    performLogout()
  }, [navigate])

  if (status === "pending") {
    return <div className="p-8 text-center text-gray-600">Logging out...</div>
  }

  if (status === "error") {
    return <div className="p-8 text-center text-red-600">Error during logout</div>
  }

  return <div className="p-8 text-center text-green-600">Logged out successfully. Redirecting...</div>
}
