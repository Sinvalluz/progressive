import type { FastifyInstance } from 'fastify';
import { CreateUser } from '@/application/use-case/create-user.js';
import { prisma } from '@/infra/db/prisma.js';
import { PrismaUserRepository } from '@/infra/db/prisma-user-repository.js';
import { ByCryptGateway } from '@/infra/security/by-crypt.js';
import { RegisterRoute } from '../routes/register-route.js';

export async function RegisterPlugin(app: FastifyInstance) {
	const userRepository = new PrismaUserRepository(prisma);
	const hashGateway = new ByCryptGateway();

	const createUser = new CreateUser(userRepository, hashGateway);

	new RegisterRoute(app, createUser).execute();
}
