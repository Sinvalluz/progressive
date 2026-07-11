import { RefreshToken } from '@/domain/refresh-token/refresh-token.js';
import type { RefreshTokenRepository } from '@/domain/refresh-token/refresh-token-repository.js';
import type { UserRepository } from '@/domain/user/user-repository.js';
import { InvalidCredentialsError } from '../erros/invalid-credentials.js';
import type { HashPasswordGateway } from '../gateway/hash-password-gateway.js';
import type { HashRefreshTokenGateway } from '../gateway/hash-refresh-token-gateway.js';
import type { TokenAuthenticationGateway } from '../gateway/token-authentication-gateway.js';
import type { UseCase } from './use-case.js';

export interface LoginUserInput {
	email: string;
	password: string;
}

export interface LoginUserOutput {
	accessToken: string;
	refreshToken: string;
}

export class LoginUser implements UseCase<LoginUserInput, LoginUserOutput> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly hashPasswordGateway: HashPasswordGateway,
		private readonly tokenAuthenticationGateway: TokenAuthenticationGateway,
		private readonly refreshTokenRepository: RefreshTokenRepository,
		private readonly hashRefreshTokenGateway: HashRefreshTokenGateway,
	) {}

	async execute(loginUserInput: LoginUserInput): Promise<LoginUserOutput> {
		const user = await this.userRepository.findByEmail(loginUserInput.email);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		const isMatchPassword = await this.hashPasswordGateway.compare(loginUserInput.password, user.password);

		if (!isMatchPassword) {
			throw new InvalidCredentialsError();
		}

		const accessToken = this.tokenAuthenticationGateway.sign(
			{
				email: user.email,
				id: user.id,
				name: user.name,
			},
			{ expiresIn: '20s' },
		);

		const refreshTokenJwt = this.tokenAuthenticationGateway.sign(
			{ email: user.email, id: user.id, name: user.name },
			{ expiresIn: '7d' },
		);

		const hashRefreshToken = this.hashRefreshTokenGateway.hash(refreshTokenJwt);

		const { refreshToken } = await this.refreshTokenRepository.create(
			RefreshToken.create(hashRefreshToken, user.id),
		);

		return { accessToken, refreshToken };
	}
}
