import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import type { User } from '@complit/api-client'

import { api } from './api'
import { routeTree } from './routeTree.gen'

import './styles.css'

export type { User }

export interface RouterContext {
  checkAuthStatus: () => Promise<User | null>
}

async function checkAuthStatus(): Promise<User | null> {
  return api.auth.getCurrentUser()
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
