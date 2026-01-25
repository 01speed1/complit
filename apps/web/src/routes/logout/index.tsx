import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/logout/')({
  component: RouteComponent,
})

function RouteComponent() {
  void fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, { method: 'POST', credentials: 'include' })
  return <div>Logged out</div>
}
