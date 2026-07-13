import type { FastifyInstance } from 'fastify';
import { CreateRefreshToken } from '@/application/use-case/create-refresh-token.js';
import { CreateUser } from '@/application/use-case/create-user.js';
import { RegisterUser } from '@/application/use-case/register-user.js';
import { prisma } from '@/infra/db/prisma.js';
import { PrismaRefreshTokenRepository } from '@/infra/db/prisma-refresh-token-repository.js';
import { prismaRegistrationTokenRepository } from '@/infra/db/prisma-registration-token-repository.js';
import { PrismaUserRepository } from '@/infra/db/prisma-user-repository.js';
import { ByCryptGateway } from '@/infra/security/by-crypt.js';
import { CryptoGateway } from '@/infra/security/crypto.js';
import { RegisterRoute } from '../routes/register-route.js';

export async function RegisterPlugin(app: FastifyInstance) {
	const userRepository = new PrismaUserRepository(prisma);
	const registrationTokenRepository = new prismaRegistrationTokenRepository(prisma);
	const refreshTokenRepository = new PrismaRefreshTokenRepository(prisma);
	const hashPasswordGateway = new ByCryptGateway();
	const createUser = new CreateUser(userRepository, hashPasswordGateway);
	const hashRefreshTokenGateway = new CryptoGateway();
	const registerUser = new RegisterUser(createUser, registrationTokenRepository);
	const createRefreshToken = new CreateRefreshToken(hashRefreshTokenGateway, refreshTokenRepository);

	new RegisterRoute(app, registerUser, createRefreshToken).execute();
}
