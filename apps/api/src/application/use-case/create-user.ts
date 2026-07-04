import { EmailIsAlreadyInUse } from '@/application/erros/email-is-already-in-use.js';
import type { HashPasswordGateway } from '@/application/gateway/hash-password-gateway.js';
import { User } from '@/domain/user/user.js';
import type { UserRepository } from '@/domain/user/user-repository.js';
import type { UseCase } from './use-case.js';

export interface CreateUserInput {
	email: string;
	name: string;
	password: string;
}

export interface CreateUserOutput {
	id: string;
	email: string;
	name: string;
	role: 'USER' | 'ADMIN';
	createAt: Date;
	updateAt: Date;
}

export class CreateUser implements UseCase<CreateUserInput, CreateUserOutput> {
	constructor(
		private readonly userGateway: UserRepository,
		private readonly hashPasswordGateway: HashPasswordGateway,
	) {}

	async execute(createUserInput: CreateUserInput): Promise<CreateUserOutput> {
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
			createAt: user.createdAt,
			updateAt: user.updateAt,
		};
	}
}
