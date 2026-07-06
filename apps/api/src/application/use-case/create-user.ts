import { EmailIsAlreadyInUse } from '@/application/erros/email-is-already-in-use.js';
import type { HashPasswordGateway } from '@/application/gateway/hash-password-gateway.js';
import type { RegistrationTokenRepository } from '@/domain/registration-token/registration-token-repository.js';
import { User } from '@/domain/user/user.js';
import type { UserRepository } from '@/domain/user/user-repository.js';
import { InvalidRegistrationToken } from '../erros/invalid-registration-token.js';
import type { TokenAuthenticationGateway } from '../gateway/token-authentication-gateway.js';
import type { UseCase } from './use-case.js';

export interface CreateUserInput {
	email: string;
	name: string;
	password: string;
	registrationToken: string;
}

export interface CreateUserOutput {
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

export class CreateUser implements UseCase<CreateUserInput, CreateUserOutput> {
	constructor(
		private readonly userGateway: UserRepository,
		private readonly registrationTokenRepository: RegistrationTokenRepository,
		private readonly hashPasswordGateway: HashPasswordGateway,
		private readonly tokenAuthenticationGateway: TokenAuthenticationGateway<TokenPayload>,
	) {}

	async execute(createUserInput: CreateUserInput): Promise<CreateUserOutput> {
		const registrationToken = await this.registrationTokenRepository.find(createUserInput.registrationToken);

		if (!registrationToken) {
			throw new InvalidRegistrationToken();
		}

		const userExist = await this.userGateway.findByEmail(createUserInput.email);

		if (userExist) {
			throw new EmailIsAlreadyInUse();
		}

		const hashedPassword = await this.hashPasswordGateway.hash(createUserInput.password);

		const user = await this.userGateway.create(
			User.create(createUserInput.email, createUserInput.name, hashedPassword),
		);

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
