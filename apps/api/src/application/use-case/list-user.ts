import type { User } from '@/domain/user/user.js';
import type { UserRepository } from '@/domain/user/user-repository.js';
import { UserNotFound } from '../erros/user-not-found.js';
import type { UseCase } from './use-case.js';

export type ListUserInput = {
	id: string;
};

export type ListUserOutput = Omit<User, 'password'>;

export class ListUser implements UseCase<ListUserInput, ListUserOutput> {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(listUserInput: ListUserInput): Promise<ListUserOutput> {
		const user = await this.userRepository.findById(listUserInput.id);

		if (!user) {
			throw new UserNotFound();
		}

		const { password, ...userWithoutPassword } = user;

		return userWithoutPassword;
	}
}
