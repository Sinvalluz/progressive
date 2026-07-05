import type { PrismaClient } from '../../../generated/prisma/client.js';
import { User } from '../../domain/user/user.js';
import type { UserRepository } from '../../domain/user/user-repository.js';

export class PrismaUserRepository implements UserRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.prismaClient.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) return null;

		return new User(
			user.id,
			user.email,
			user.name,
			user.password,
			user.role,
			user.imgUrl,
			user.createAt,
			user.updateAt,
		);
	}
	async create(user: User): Promise<User> {
		const userCreated = await this.prismaClient.user.create({
			data: {
				id: user.id,
				email: user.email,
				name: user.name,
				password: user.password,
				role: user.role,
				createAt: user.createdAt,
				updateAt: user.updateAt,
			},
		});

		return new User(
			userCreated.id,
			userCreated.email,
			userCreated.name,
			userCreated.password,
			userCreated.role,
			userCreated.imgUrl,
			userCreated.createAt,
			userCreated.updateAt,
		);
	}
}
