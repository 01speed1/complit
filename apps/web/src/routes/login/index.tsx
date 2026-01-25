import { createFileRoute } from "@tanstack/react-router";

const API_BASE = (import.meta.env.VITE_API_URL as string) || "";

export const Route = createFileRoute("/login/")({
  component: Login,
});

function Login() {
  const startLogin = () => {
    window.location.href = `${API_BASE}/auth/better`;
  };

  return (
    <>
      <h1>Login</h1>
      <button onClick={startLogin}>Sign in with Google</button>
    </>
  );
}
