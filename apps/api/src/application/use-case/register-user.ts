import { RefreshToken } from '@/domain/refresh-token/refresh-token.js';
import type { RefreshTokenRepository } from '@/domain/refresh-token/refresh-token-repository.js';
import type { RegistrationTokenRepository } from '@/domain/registration-token/registration-token-repository.js';
import { InvalidRegistrationToken } from '../erros/invalid-registration-token.js';
import type { HashRefreshTokenGateway } from '../gateway/hash-refresh-token-gateway.js';
import type { TokenAuthenticationGateway } from '../gateway/token-authentication-gateway.js';
import type { CreateUser } from './create-user.js';
import type { UseCase } from './use-case.js';

type RegisterUserInput = {
	email: string;
	name: string;
	password: string;
	registrationToken: string;
};
type RegisterUserOutput = {
	accessToken: string;
	refreshToken: string;
};

export class RegisterUser implements UseCase<RegisterUserInput, RegisterUserOutput> {
	constructor(
		private readonly tokenAuthenticationGateway: TokenAuthenticationGateway,
		private readonly createUser: CreateUser,
		private readonly registrationTokenRepository: RegistrationTokenRepository,
		private readonly refreshTokenRepository: RefreshTokenRepository,
		private readonly hashRefreshTokenGateway: HashRefreshTokenGateway,
	) {}
	async execute(registerUserInput: RegisterUserInput): Promise<RegisterUserOutput> {
		const registrationToken = await this.registrationTokenRepository.find(registerUserInput.registrationToken);

		if (!registrationToken) {
			throw new InvalidRegistrationToken();
		}

		const user = await this.createUser.execute(registerUserInput);

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

		await this.refreshTokenRepository.create(RefreshToken.create(hashRefreshToken, user.id));

		return { accessToken, refreshToken: refreshTokenJwt };
	}
}
