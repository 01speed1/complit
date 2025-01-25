import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession, commitSession } from "../services/auth/authCookie";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  let rawCookie;
  let token;
  try {
    const cookieHeader = request.headers.get("Cookie");

    rawCookie = cookieHeader
      ?.split(";")
      .find((c) => c.trim().startsWith("auth_token="));
    token = rawCookie?.split("=")[1];

    const session = await getSession(cookieHeader);
    session.set("token", token);

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    return redirect("/me", {
      headers: {
        "Set-Cookie": await commitSession(session, {
          expires,
        }),
      },
    });
  } catch (error) {
    console.error(error);
    return { token, rawCookie, error: error.toString() };
  }
};

export default function AuthCallback() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <pre>{JSON.stringify(data)}</pre>
    </>
  );
}
