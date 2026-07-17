import type { FastifyInstance } from 'fastify';
import { ListUser } from '@/application/use-case/list-user.js';
import { prisma } from '@/infra/db/prisma.js';
import { PrismaUserRepository } from '@/infra/db/prisma-user-repository.js';
import { MeRoute } from '../routes/me-route.js';

export async function mePlugin(app: FastifyInstance) {
	const userRepository = new PrismaUserRepository(prisma);
	const listUser = new ListUser(userRepository);
	new MeRoute(app, listUser).execute();
}
