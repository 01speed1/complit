import { FastifyInstance } from 'fastify';

type Milestone = {
  id: string;
  goalId: string;
  title: string;
  description?: string;
  status?: 'pending' | 'in_progress' | 'completed';
  completedAt?: string | null;
  order?: number;
  createdAt: string;
};

const milestones: Milestone[] = [];

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async () => milestones.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as any;
    const m = milestones.find((x) => x.id === id);
    if (!m) return reply.status(404).send({ message: 'Milestone not found' });
    return m;
  });

  fastify.post('/', async (request, reply) => {
    const body = request.body as any;
    if (!body?.goalId || !body?.title) return reply.status(400).send({ message: 'goalId and title are required' });
    const newMilestone: Milestone = {
      id: Math.random().toString(36).slice(2, 9),
      goalId: body.goalId,
      title: body.title,
      description: body.description,
      status: 'pending',
      completedAt: null,
      order: milestones.filter((m) => m.goalId === body.goalId).length,
      createdAt: new Date().toISOString()
    };
    milestones.push(newMilestone);
    return reply.status(201).send(newMilestone);
  });

  fastify.put('/:id', async (request, reply) => {
    const { id } = request.params as any;
    const body = request.body as any;
    const idx = milestones.findIndex((x) => x.id === id);
    if (idx === -1) return reply.status(404).send({ message: 'Milestone not found' });
    const updated = { ...milestones[idx], ...body } as Milestone;
    milestones[idx] = updated;
    return updated;
  });

  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params as any;
    const idx = milestones.findIndex((x) => x.id === id);
    if (idx === -1) return reply.status(404).send({ message: 'Milestone not found' });
    milestones.splice(idx, 1);
    return reply.status(204).send();
  });
}
