import { RefreshToken } from '@/domain/refresh-token/refresh-token.js';
import type { RefreshTokenRepository } from '@/domain/refresh-token/refresh-token-repository.js';
import { prisma } from './prisma.js';

export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
	async create(refreshToken: RefreshToken): Promise<RefreshToken> {
		const prismaRefreshToken = await prisma.refreshTokens.create({
			data: {
				id: refreshToken.id,
				refreshToken: refreshToken.refreshToken,
				createAt: refreshToken.createdAt,
				updateAt: refreshToken.updateAt,
				userId: refreshToken.userId,
			},
		});

		return new RefreshToken(
			prismaRefreshToken.id,
			prismaRefreshToken.refreshToken,
			prismaRefreshToken.userId,
			prismaRefreshToken.createAt,
			prismaRefreshToken.updateAt,
		);
	}
}
