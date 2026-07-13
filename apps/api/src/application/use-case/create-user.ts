import { EmailIsAlreadyInUse } from '@/application/erros/email-is-already-in-use.js';
import type { HashPasswordGateway } from '@/application/gateway/hash-password-gateway.js';
import { User } from '@/domain/user/user.js';
import type { UserRepository } from '@/domain/user/user-repository.js';
import type { UseCase } from './use-case.js';

export type CreateUserInput = {
	email: string;
	name: string;
	password: string;
	registrationToken: string;
};

export type CreateUserOutput = Omit<User, 'password'>;

export class CreateUser implements UseCase<CreateUserInput, CreateUserOutput> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly hashPasswordGateway: HashPasswordGateway,
	) {}

	async execute(createUserInput: CreateUserInput): Promise<CreateUserOutput> {
		const userExist = await this.userRepository.findByEmail(createUserInput.email);

		if (userExist) {
			throw new EmailIsAlreadyInUse();
		}

		const hashedPassword = await this.hashPasswordGateway.hash(createUserInput.password);

		const user = await this.userRepository.create(
			User.create(createUserInput.email, createUserInput.name, hashedPassword),
		);

		return {
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
			imgUrl: user.imgUrl,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};
	}
}
