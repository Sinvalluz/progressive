import { RefreshToken } from '@/domain/refresh-token/refresh-token.js';
import type { RefreshTokenRepository } from '@/domain/refresh-token/refresh-token-repository.js';
import type { HashRefreshTokenGateway } from '../gateway/hash-refresh-token-gateway.js';
import type { UseCase } from './use-case.js';

type CreateRefreshTokenInput = {
	userId: string;
	refreshToken: string;
};

type CreateRefreshTokenOutput = RefreshToken;

export class CreateRefreshToken implements UseCase<CreateRefreshTokenInput, CreateRefreshTokenOutput> {
	constructor(
		private readonly hashRefreshTokenGateway: HashRefreshTokenGateway,
		private readonly refreshTokenRepository: RefreshTokenRepository,
	) {}
	async execute(createRefreshTokenInput: CreateRefreshTokenInput): Promise<CreateRefreshTokenOutput> {
		const hashRefreshToken = await this.hashRefreshTokenGateway.hash(createRefreshTokenInput.refreshToken);

		const refreshToken = await this.refreshTokenRepository.create(
			RefreshToken.create(hashRefreshToken, createRefreshTokenInput.userId),
		);

		return new RefreshToken(
			refreshToken.id,
			refreshToken.refreshToken,
			refreshToken.userId,
			refreshToken.createdAt,
			refreshToken.updatedAt,
		);
	}
}
