import type { FastifyPluginAsync } from "fastify";
import crypto from "node:crypto";

type SessionData = {
  user: { id: string; email?: string; name?: string };
  createdAt: number;
  tokens?: { access_token?: string; id_token?: string; refresh_token?: string; expires_in?: number };
};

const sessions = new Map<string, SessionData>();

const GOOGLE_OAUTH_AUTHORIZE = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_OAUTH_TOKEN = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO = "https://www.googleapis.com/oauth2/v3/userinfo";

const plugin: FastifyPluginAsync = async (fastify) => {
  // Start OAuth2 authorization (server as confidential client)
  fastify.get("/better", async (request, reply) => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) return reply.status(500).send({ error: "GOOGLE_CLIENT_ID not configured" });

    const state = crypto.randomBytes(16).toString("hex");
    // store minimal state in memory to validate on callback
    const stateKey = `st_${state}`;
    sessions.set(stateKey, { user: null as any, createdAt: Date.now() });

    const serverUrl = getServerUrl();
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

  // OAuth callback: exchange code for tokens and fetch userinfo
  fastify.get("/callback", async (request, reply) => {
    const { code, state } = request.query as any;
    if (!code) return reply.status(400).send({ error: "Missing code" });
    if (!state) return reply.status(400).send({ error: "Missing state" });

    const stateKey = `st_${state}`;
    if (!sessions.has(stateKey)) return reply.status(400).send({ error: "Invalid state" });
    // remove state marker
    sessions.delete(stateKey);

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) return reply.status(500).send({ error: "OAuth client not configured" });

    const serverUrl = getServerUrl();
    const redirectUri = `${serverUrl}/auth/callback`;

    // Exchange code
    const body = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    });

    const tokenRes = await fetch(GOOGLE_OAUTH_TOKEN, { method: "POST", body, headers: { "content-type": "application/x-www-form-urlencoded" } });
    if (!tokenRes.ok) {
      const txt = await tokenRes.text();
      fastify.log.error({ tokenError: txt });
      return reply.status(502).send({ error: "Token exchange failed" });
    }
    const tokenPayload = await tokenRes.json();

    const accessToken = tokenPayload.access_token as string | undefined;

    if (!accessToken) return reply.status(502).send({ error: "No access token" });

    // Fetch userinfo
    const userRes = await fetch(GOOGLE_USERINFO, { headers: { Authorization: `Bearer ${accessToken}` } });
    if (!userRes.ok) {
      const txt = await userRes.text();
      fastify.log.error({ userinfoError: txt });
      return reply.status(502).send({ error: "Failed to fetch userinfo" });
    }
    const userInfo = await userRes.json();

    const user = { id: userInfo.sub ?? userInfo.id ?? String(Date.now()), email: userInfo.email, name: userInfo.name };
    const sessionId = `s_${crypto.randomBytes(12).toString("hex")}`;
    const sessionData: SessionData = { user, createdAt: Date.now(), tokens: { access_token: accessToken, id_token: tokenPayload.id_token, refresh_token: tokenPayload.refresh_token, expires_in: tokenPayload.expires_in } };
    sessions.set(sessionId, sessionData);

    // Cookie options: secure if running under HTTPS (NODE_ENV=production)
    const cookieOptions = { httpOnly: true, path: '/', sameSite: 'lax' as const, secure: process.env.NODE_ENV === 'production' };
    reply.setCookie('session_id', sessionId, cookieOptions);

    // Redirect to frontend
    return reply.redirect(getFrontendUrl());
  });

  // Return current user based on session cookie
  fastify.get('/me', async (request, reply) => {
    const sessionId = request.cookies?.session_id as string | undefined;
    if (!sessionId) return reply.status(200).send({ user: null });
    const session = sessions.get(sessionId);
    if (!session) return reply.status(200).send({ user: null });
    return reply.send({ user: session.user });
  });

  // Logout and clear cookie
  fastify.post('/logout', async (request, reply) => {
    const sessionId = request.cookies?.session_id as string | undefined;
    if (sessionId) sessions.delete(sessionId);
    reply.clearCookie('session_id', { path: '/' });
    return reply.send({ ok: true });
  });
};

function getFrontendUrl() {
  return process.env.FRONTEND_URL || 'http://localhost:5173';
}

function getServerUrl() {
  return process.env.SERVER_URL || `http://localhost:3000`;
}

export default plugin;
