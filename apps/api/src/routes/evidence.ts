import { FastifyInstance } from 'fastify';

type Evidence = {
  id: string;
  goalId: string;
  milestoneId?: string | null;
  content: string;
  createdAt: string;
  updatedAt?: string;
};

const evidences: Evidence[] = [];

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async (request) => {
    const { goalId } = (request.query as any) || {};
    let list = evidences.slice();
    if (goalId) list = list.filter((e) => e.goalId === goalId);
    return list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  });

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as any;
    const e = evidences.find((x) => x.id === id);
    if (!e) return reply.status(404).send({ message: 'Evidence not found' });
    return e;
  });

  fastify.post('/', async (request, reply) => {
    const body = request.body as any;
    if (!body?.goalId || !body?.content) return reply.status(400).send({ message: 'goalId and content are required' });
    const newEvidence: Evidence = {
      id: Math.random().toString(36).slice(2, 9),
      goalId: body.goalId,
      milestoneId: body.milestoneId ?? null,
      content: body.content,
      createdAt: new Date().toISOString(),
      updatedAt: undefined
    };
    evidences.push(newEvidence);
    return reply.status(201).send(newEvidence);
  });

  fastify.put('/:id', async (request, reply) => {
    const { id } = request.params as any;
    const body = request.body as any;
    const idx = evidences.findIndex((x) => x.id === id);
    if (idx === -1) return reply.status(404).send({ message: 'Evidence not found' });
    evidences[idx] = { ...evidences[idx], ...body, updatedAt: new Date().toISOString() };
    return evidences[idx];
  });

  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params as any;
    const idx = evidences.findIndex((x) => x.id === id);
    if (idx === -1) return reply.status(404).send({ message: 'Evidence not found' });
    evidences.splice(idx, 1);
    return reply.status(204).send();
  });
}
