import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <div>
        <h1>No logged in</h1>
        <Link to="/login">Log in</Link>
      </div>

      <div>
        <h1>Logged in</h1>
        <Link to="/logout">Log out</Link>
      </div>
    </>
  )
}
