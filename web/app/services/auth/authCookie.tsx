import { createCookieSessionStorage } from "@remix-run/node";

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "auth_token",
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "lax",
      // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      domain: "",
      secrets: ["some-secret"],
    },
  });
