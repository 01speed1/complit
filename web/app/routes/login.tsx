import { useLoaderData } from "@remix-run/react";

export function loader() {
  return {
    authUrl: process.env.API_URL, // "http://localhost:3001", //|| process.env.AUTH_URL || ""
  };
}

export default function Login() {
  const { authUrl } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex flex-col items-center justify-center mb-8">
        <h2>Login</h2>
        <a
          href={`${authUrl}/auth/google`}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Login with google
        </a>
      </div>
    </>
  );
}
