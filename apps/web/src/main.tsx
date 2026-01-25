import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

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

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
