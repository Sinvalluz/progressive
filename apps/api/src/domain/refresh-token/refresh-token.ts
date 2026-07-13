import { randomUUID } from 'node:crypto';

export class RefreshToken {
	constructor(
		readonly id: string,
		readonly refreshToken: string,
		readonly userId: string,
		readonly createdAt: Date,
		readonly updatedAt: Date,
	) {}

	static create(hashRefreshToken: string, userId: string): RefreshToken {
		return new RefreshToken(randomUUID(), hashRefreshToken, userId, new Date(), new Date());
	}
}
