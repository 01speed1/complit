declare global {
  interface Window {
    ENV: {
      authUrl: string;
    };
  }
}

export default function Login() {
  console.log({ env: window.ENV });
  const authUrl = window?.ENV?.authUrl || "";

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
