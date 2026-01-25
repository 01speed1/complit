import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import goalsRoutes from "./routes/goals.ts";
import milestonesRoutes from "./routes/milestones.ts";
import evidenceRoutes from "./routes/evidence.ts";
import authRoutes from "./routes/auth.ts";

const fastify = Fastify({ logger: true });

// Register CORS plugin
fastify.register(fastifyCors as any, { origin: true });

// Register cookie plugin for session management
fastify.register(fastifyCookie as any);

fastify.register(goalsRoutes, { prefix: "/goals" });
fastify.register(milestonesRoutes, { prefix: "/milestones" });
fastify.register(evidenceRoutes, { prefix: "/evidence" });
fastify.register(authRoutes, { prefix: "/auth" });

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: "0.0.0.0" });
    fastify.log.info("Server listening on 0.0.0.0:3001");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
