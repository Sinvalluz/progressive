import type { FastifyInstance } from 'fastify';
import { ListUser } from '@/application/use-case/list-user.js';
import { prisma } from '@/infra/db/prisma.js';
import { PrismaUserRepository } from '@/infra/db/prisma-user-repository.js';
import { MeRoute } from '../routes/me-route.js';

export function mePlugin(app: FastifyInstance) {
	const prismaUserRepository = new PrismaUserRepository(prisma);
	const listUser = new ListUser(prismaUserRepository);
	return new MeRoute(app, listUser).execute();
}
