import { FastifyInstance } from 'fastify';

type Goal = {
  id: string;
  title: string;
  description?: string;
  targetMilestone?: string;
  durationInMonths?: number;
  priority?: number;
  status?: 'active' | 'completed' | 'paused';
  createdAt: string;
  completedAt?: string | null;
  order?: number;
};

const goals: Goal[] = [];

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async () => goals.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as any;
    const g = goals.find((x) => x.id === id);
    if (!g) return reply.status(404).send({ message: 'Goal not found' });
    return g;
  });

  fastify.post('/', async (request, reply) => {
    const body = request.body as any;
    if (!body?.title) return reply.status(400).send({ message: 'Title is required' });
    const newGoal: Goal = {
      id: Math.random().toString(36).slice(2, 9),
      title: body.title,
      description: body.description,
      targetMilestone: body.targetMilestone,
      durationInMonths: body.durationInMonths,
      priority: body.priority ?? 0,
      status: 'active',
      createdAt: new Date().toISOString(),
      completedAt: null,
      order: goals.length
    };
    goals.push(newGoal);
    return reply.status(201).send(newGoal);
  });

  fastify.put('/:id', async (request, reply) => {
    const { id } = request.params as any;
    const body = request.body as any;
    const idx = goals.findIndex((x) => x.id === id);
    if (idx === -1) return reply.status(404).send({ message: 'Goal not found' });
    const updated = { ...goals[idx], ...body } as Goal;
    goals[idx] = updated;
    return updated;
  });

  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params as any;
    const idx = goals.findIndex((x) => x.id === id);
    if (idx === -1) return reply.status(404).send({ message: 'Goal not found' });
    goals.splice(idx, 1);
    return reply.status(204).send();
  });
}
