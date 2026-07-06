import type { UserRepository } from '@/domain/user/user-repository.js';
import { InvalidCredentialsError } from '../erros/invalid-credentials.js';
import type { HashPasswordGateway } from '../gateway/hash-password-gateway.js';
import type { TokenAuthenticationGateway } from '../gateway/token-authentication-gateway.js';
import type { UseCase } from './use-case.js';

export interface LoginUserInput {
	email: string;
	password: string;
}

export interface LoginUserOutput {
	token: string;
	user: {
		id: string;
		email: string;
		name: string;
		role: 'USER' | 'ADMIN';
		imgUrl: string | null;
		createAt: Date;
		updateAt: Date;
	};
}

interface TokenPayload {
	id: string;
	email: string;
	name: string;
}

export class LoginUser implements UseCase<LoginUserInput, LoginUserOutput> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly hashPasswordGateway: HashPasswordGateway,
		private readonly tokenAuthenticationGateway: TokenAuthenticationGateway<TokenPayload>,
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

		const token = this.tokenAuthenticationGateway.sign({
			email: user.email,
			id: user.id,
			name: user.name,
		});

		return {
			token: token,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role,
				imgUrl: user.imgUrl,
				createAt: user.createdAt,
				updateAt: user.updateAt,
			},
		};
	}
}
