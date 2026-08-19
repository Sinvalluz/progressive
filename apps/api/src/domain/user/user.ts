export class User {
	constructor(
		readonly id: string,
		readonly email: string,
		readonly name: string,
		readonly password: string,
		readonly role: 'USER' | 'ADMIN',
		readonly imgUrl: string | null,
		readonly createdAt: Date,
		readonly updatedAt: Date,
	) {}
}
