import { useLoaderData } from "@remix-run/react";
import CardContainer from "~/components/CardContainer";

export const loader = async () => {
  return {
    authUrl: process.env.EXTERNAL_API_URL,
  };
};

export default function Login() {
  const { authUrl } = useLoaderData<typeof loader>();
  // className="w-full max-w-md p-8"
  return (
    <div className="flex items-center justify-center min-h-screen">
      <CardContainer>
        <div className="flex flex-col items-center justify-center w-[20rem] h-[16rem]">
          <h2 className="font-lexend text-2xl pb-6">Login</h2>
          <p className="py-6">
            Sign in with Google to access your account securely.
          </p>
          <a
            href={`${authUrl}/auth/google`}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Signup/Login with google
          </a>
        </div>
      </CardContainer>
    </div>
  );
}
