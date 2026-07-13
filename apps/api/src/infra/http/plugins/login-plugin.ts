import type { FastifyInstance } from 'fastify';
import { CreateRefreshToken } from '@/application/use-case/create-refresh-token.js';
import { LoginUser } from '@/application/use-case/login-user.js';
import { prisma } from '@/infra/db/prisma.js';
import { PrismaRefreshTokenRepository } from '@/infra/db/prisma-refresh-token-repository.js';
import { PrismaUserRepository } from '@/infra/db/prisma-user-repository.js';
import { ByCryptGateway } from '@/infra/security/by-crypt.js';
import { CryptoGateway } from '@/infra/security/crypto.js';
import { LoginRoute } from '../routes/login-route.js';

export async function LoginPlugin(app: FastifyInstance) {
	const userRepository = new PrismaUserRepository(prisma);
	const refreshTokenRepository = new PrismaRefreshTokenRepository(prisma);
	const hashGateway = new ByCryptGateway();
	const hashRefreshTokenGateway = new CryptoGateway();
	const loginUser = new LoginUser(userRepository, hashGateway);
	const createRefreshToken = new CreateRefreshToken(hashRefreshTokenGateway, refreshTokenRepository);

	new LoginRoute(app, loginUser, createRefreshToken).execute();
}
