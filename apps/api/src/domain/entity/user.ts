import { randomUUID, type UUID } from 'node:crypto';

export class User {
	constructor(
		readonly id: UUID,
		readonly email: string,
		readonly name: string,
		readonly password: string,
		readonly role: 'USER' | 'ADMIN',
		readonly createdAt: Date,
		readonly updateAt: Date,
	) {}

	static create(email: string, name: string, password: string): User {
		return new User(randomUUID(), email, name, password, 'USER', new Date(), new Date());
	}
}
