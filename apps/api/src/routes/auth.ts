import type { FastifyPluginAsync } from "fastify";
import crypto from "node:crypto";
import { db } from "../db/client.ts";
import { users, sessions } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import { generateSessionId } from "../lib/utils.ts";

const GOOGLE_OAUTH_AUTHORIZE = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_OAUTH_TOKEN = "https://oauth2.googleapis.com/token";
const GOOGLE_USER_INFO = "https://www.googleapis.com/oauth2/v3/userinfo";

function _getFrontendUrl() {
  return process.env.FRONTEND_URL || "http://localhost:3001";
}

function _getServerUrl() {
  return process.env.SERVER_URL || `http://localhost:3000`;
}

const plugin: FastifyPluginAsync = async (fastify) => {
  // Start OAuth2 authorization (server as confidential client)
  fastify.get("/better", async (_, reply) => {
    const clientId = process.env.GOOGLE_CLIENT_ID;

    if (!clientId)
      return reply
        .status(500)
        .send({ error: "GOOGLE_CLIENT_ID not configured" });

    const state = crypto.randomBytes(16).toString("hex");

    const serverUrl = _getServerUrl();
    const redirectUri = `${serverUrl}/auth/callback`;

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
      state,
    });

    return reply.redirect(`${GOOGLE_OAUTH_AUTHORIZE}?${params.toString()}`);
  });

  fastify.get<{ Querystring: { code?: string; state?: string } }>(
    "/callback",
    async (request, reply) => {
      const { code, state } = request.query;
      if (!code) return reply.status(400).send({ error: "Missing code" });
      if (!state) return reply.status(400).send({ error: "Missing state" });

      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      if (!clientId || !clientSecret)
        return reply.status(500).send({ error: "OAuth client not configured" });

      const serverUrl = _getServerUrl();
      const redirectUri = `${serverUrl}/auth/callback`;

      // Exchange code
      const body = new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      });

      const tokenRes = await fetch(GOOGLE_OAUTH_TOKEN, {
        method: "POST",
        body,
        headers: { "content-type": "application/x-www-form-urlencoded" },
      });
      if (!tokenRes.ok) {
        const txt = await tokenRes.text();
        fastify.log.error({ tokenError: txt });
        return reply.status(502).send({ error: "Token exchange failed" });
      }
      const tokenPayload = await tokenRes.json();

      const accessToken = tokenPayload.access_token as string | undefined;

      if (!accessToken)
        return reply.status(502).send({ error: "No access token" });

      // Fetch user_info
      const userRes = await fetch(GOOGLE_USER_INFO, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!userRes.ok) {
        const txt = await userRes.text();
        fastify.log.error({ userInfoError: txt });
        return reply.status(502).send({ error: "Failed to fetch userInfo" });
      }
      const userInfo = await userRes.json();

      const userId = userInfo.sub ?? userInfo.id ?? String(Date.now());

      await db
        .insert(users)
        .values({
          id: userId,
          email: userInfo.email,
          name: userInfo.name,
        })
        .onConflictDoUpdate({
          target: users.id,
          set: {
            email: userInfo.email,
            name: userInfo.name,
          },
        });

      const sessionId = generateSessionId();
      const expiresAt = tokenPayload.expires_in
        ? new Date(Date.now() + tokenPayload.expires_in * 1000)
        : null;

      await db.insert(sessions).values({
        id: sessionId,
        userId,
        accessToken,
        refreshToken: tokenPayload.refresh_token,
        expiresAt,
      });

      // Cookie options: secure if running under HTTPS (NODE_ENV=production)
      const cookieOptions = {
        httpOnly: true,
        path: "/",
        sameSite: "lax" as const,
        secure: process.env.NODE_ENV === "production",
      };
      reply.setCookie("session_id", sessionId, cookieOptions);

      return reply.redirect(_getFrontendUrl());
    },
  );

  fastify.get("/me", async (request, reply) => {
    const sessionId = request.cookies?.session_id as string | undefined;
    if (!sessionId) return reply.status(200).send({ user: null });

    const result = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
      })
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(eq(sessions.id, sessionId))
      .limit(1);

    if (result.length === 0) {
      return reply.status(200).send({ user: null });
    }

    return reply.send({ user: result[0] });
  });

  fastify.post("/logout", async (request, reply) => {
    const sessionId = request.cookies?.session_id as string | undefined;
    if (sessionId) {
      await db.delete(sessions).where(eq(sessions.id, sessionId));
    }
    reply.clearCookie("session_id", { path: "/" });
    return reply.send({ ok: true });
  });
};

export default plugin;
