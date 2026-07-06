import type { FastifyInstance } from 'fastify';
import { LoginUser } from '@/application/use-case/login-user.js';
import { prisma } from '@/infra/db/prisma.js';
import { PrismaUserRepository } from '@/infra/db/prisma-user-repository.js';
import { ByCryptGateway } from '@/infra/security/by-crypt.js';
import { JwtGateway } from '@/infra/security/jwt-gateway.js';
import { LoginRoute } from '../routes/login-route.js';

export async function LoginPlugin(app: FastifyInstance) {
	const userRepository = new PrismaUserRepository(prisma);

	const hashGateway = new ByCryptGateway();
	const jwtGateway = new JwtGateway(app);

	const loginUser = new LoginUser(userRepository, hashGateway, jwtGateway);

	new LoginRoute(app, loginUser).execute();
}
