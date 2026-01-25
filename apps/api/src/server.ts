import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import goalsRoutes from "./routes/goals.ts";
import milestonesRoutes from "./routes/milestones.ts";
import evidenceRoutes from "./routes/evidence.ts";
import authRoutes from "./routes/auth.ts";

const fastify = Fastify({ logger: true });

fastify.register(fastifyCors as any, {
  origin: process.env.FRONTEND_URL || "http://localhost:3001",
  credentials: true,
});

// Register cookie plugin for session management
fastify.register(fastifyCookie as any);

fastify.register(goalsRoutes, { prefix: "/goals" });
fastify.register(milestonesRoutes, { prefix: "/milestones" });
fastify.register(evidenceRoutes, { prefix: "/evidence" });
fastify.register(authRoutes, { prefix: "/auth" });

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    fastify.log.info("Server listening on 0.0.0.0:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
