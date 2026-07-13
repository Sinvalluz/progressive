import type { PrismaClient } from '@prisma/client/extension';
import { RefreshToken } from '@/domain/refresh-token/refresh-token.js';
import type { RefreshTokenRepository } from '@/domain/refresh-token/refresh-token-repository.js';

export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
	constructor(private readonly prismaClient: PrismaClient) {}
	async create(refreshToken: RefreshToken): Promise<RefreshToken> {
		const prismaRefreshToken = await this.prismaClient.refreshTokens.create({
			data: {
				id: refreshToken.id,
				refreshToken: refreshToken.refreshToken,
				createdAt: refreshToken.createdAt,
				updatedAt: refreshToken.updatedAt,
				userId: refreshToken.userId,
			},
		});

		return new RefreshToken(
			prismaRefreshToken.id,
			prismaRefreshToken.refreshToken,
			prismaRefreshToken.userId,
			prismaRefreshToken.createdAt,
			prismaRefreshToken.updatedAt,
		);
	}
}
