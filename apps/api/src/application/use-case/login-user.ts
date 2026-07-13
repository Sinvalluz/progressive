import type { User } from '@/domain/user/user.js';
import type { UserRepository } from '@/domain/user/user-repository.js';
import { InvalidCredentialsError } from '../erros/invalid-credentials.js';
import type { HashPasswordGateway } from '../gateway/hash-password-gateway.js';
import type { UseCase } from './use-case.js';

export type LoginUserInput = {
	email: string;
	password: string;
};

export type LoginUserOutput = Omit<User, 'password'>;

export class LoginUser implements UseCase<LoginUserInput, LoginUserOutput> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly hashPasswordGateway: HashPasswordGateway,
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
