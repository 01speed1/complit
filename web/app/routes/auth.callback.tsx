import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession, commitSession } from "../services/auth/authCookie";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");

  const rawCookie = cookieHeader
    ?.split(";")
    .find((c) => c.trim().startsWith("auth_token="));
  const token = rawCookie?.split("=")[1];

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
};
