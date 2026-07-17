import type { FastifyInstance } from 'fastify';
import { CreateUser } from '@/application/use-case/create-user.js';
import { RegisterUser } from '@/application/use-case/register-user.js';
import { prisma } from '@/infra/db/prisma.js';
import { prismaRegistrationTokenRepository } from '@/infra/db/prisma-registration-token-repository.js';
import { PrismaUserRepository } from '@/infra/db/prisma-user-repository.js';
import { ByCryptGateway } from '@/infra/security/by-crypt.js';
import { RegisterRoute } from '../routes/register-route.js';

export async function RegisterPlugin(app: FastifyInstance) {
	const userRepository = new PrismaUserRepository(prisma);
	const registrationTokenRepository = new prismaRegistrationTokenRepository(prisma);
	const hashPasswordGateway = new ByCryptGateway();
	const createUser = new CreateUser(userRepository, hashPasswordGateway);
	const registerUser = new RegisterUser(createUser, registrationTokenRepository);

	new RegisterRoute(app, registerUser).execute();
}
