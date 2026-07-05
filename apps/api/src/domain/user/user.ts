import { randomUUID } from 'node:crypto';

export class User {
	constructor(
		readonly id: string,
		readonly email: string,
		readonly name: string,
		readonly password: string,
		readonly role: 'USER' | 'ADMIN',
		readonly imgUrl: string | null,
		readonly createdAt: Date,
		readonly updateAt: Date,
	) {}

	static create(email: string, name: string, password: string): User {
		return new User(randomUUID(), email, name, password, 'USER', null, new Date(), new Date());
	}
}
