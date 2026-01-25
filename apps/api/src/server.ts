import Fastify from 'fastify';
import cors from 'cors';
import goalsRoutes from './routes/goals';
import milestonesRoutes from './routes/milestones';
import evidenceRoutes from './routes/evidence';

const fastify = Fastify({ logger: true });

// CORS middleware via fastify's decorator using reply.header where needed
fastify.register(import('fastify-cors'), { origin: true } as any).catch(() => {});

fastify.register(goalsRoutes, { prefix: '/goals' });
fastify.register(milestonesRoutes, { prefix: '/milestones' });
fastify.register(evidenceRoutes, { prefix: '/evidence' });

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info('Server listening on 0.0.0.0:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
