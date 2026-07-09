import type { RegistrationTokenRepository } from '@/domain/registration-token/registration-token-repository.js';
import { InvalidRegistrationToken } from '../erros/invalid-registration-token.js';
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
	token: string;
};

export class RegisterUser implements UseCase<RegisterUserInput, RegisterUserOutput> {
	constructor(
		private readonly tokenAuthenticationGateway: TokenAuthenticationGateway,
		private readonly createUser: CreateUser,
		private readonly registrationTokenRepository: RegistrationTokenRepository,
	) {}
	async execute(registerUserInput: RegisterUserInput): Promise<RegisterUserOutput> {
		const registrationToken = await this.registrationTokenRepository.find(registerUserInput.registrationToken);

		if (!registrationToken) {
			throw new InvalidRegistrationToken();
		}

		const user = await this.createUser.execute(registerUserInput);

		const token = this.tokenAuthenticationGateway.sign({
			email: user.email,
			id: user.id,
			name: user.name,
		});

		return { token };
	}
}
