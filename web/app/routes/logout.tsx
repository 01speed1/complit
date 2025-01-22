import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getSession, destroySession } from "../services/auth/authCookie";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
