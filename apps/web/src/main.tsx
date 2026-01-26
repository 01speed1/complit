import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

import './styles.css'

const API_BASE = (import.meta.env.VITE_API_URL as string) || ""

export type User = { id: string; email?: string; name?: string } | null

export interface RouterContext {
  checkAuthStatus: () => Promise<User>
}

async function checkAuthStatus(): Promise<User> {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, { credentials: "include" })
    if (res.ok) {
      const payload = await res.json()
      return payload.user ?? null
    }
    return null
  } catch {
    return null
  }
}

const router = createRouter({
  routeTree,
  context: { checkAuthStatus } as RouterContext,
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
