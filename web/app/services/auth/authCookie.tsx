import { createCookieSessionStorage } from "@remix-run/node";

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "auth_token",
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.EXTERNAL_API_URL || "default_secret"],
    },
  });
