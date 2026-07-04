import type { FastifyInstance } from 'fastify';
import { CreateUser } from '@/application/use-cases/create-user.js';
import { PrismaGateway } from '@/infra/db/prisma-gateway.js';
import { PrismaUserGateway } from '@/infra/db/prisma-user-gateway.js';
import { ByCryptGateway } from '@/infra/security/by-crypt.js';
import { AuthRoute } from '../routes/auth-route.js';

export async function authPlugin(app: FastifyInstance) {
	const prismaGateway = new PrismaGateway();

	const userGateway = new PrismaUserGateway(prismaGateway);
	const hashGateway = new ByCryptGateway();

	const createUser = new CreateUser(userGateway, hashGateway);

	new AuthRoute(app, createUser).register();
}
