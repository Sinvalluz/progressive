import { EmailIsAlreadyInUse } from '@/application/erros/email-is-already-in-use.js';
import type { HashPasswordGateway } from '@/application/gateway/hash-password-gateway.js';
import type { RegistrationTokenRepository } from '@/domain/registration-token/registration-token-repository.js';
import { User } from '@/domain/user/user.js';
import type { UserRepository } from '@/domain/user/user-repository.js';
import { InvalidRegistrationToken } from '../erros/invalid-registration-token.js';
import type { UseCase } from './use-case.js';

export interface CreateUserInput {
	email: string;
	name: string;
	password: string;
	registrationToken: string;
}

export interface CreateUserOutput {
	id: string;
	email: string;
	name: string;
	role: 'USER' | 'ADMIN';
	imgUrl: string | null;
	createAt: Date;
	updateAt: Date;
}

export class CreateUser implements UseCase<CreateUserInput, CreateUserOutput> {
	constructor(
		private readonly userGateway: UserRepository,
		private readonly registrationTokenRepository: RegistrationTokenRepository,
		private readonly hashPasswordGateway: HashPasswordGateway,
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

		return {
			id: user.id,
			name: user.id,
			email: user.email,
			role: user.role,
			imgUrl: user.imgUrl,
			createAt: user.createdAt,
			updateAt: user.updateAt,
		};
	}
}
