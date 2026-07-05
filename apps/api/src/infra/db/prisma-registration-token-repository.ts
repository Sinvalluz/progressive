import type { RegistrationToken } from '@/domain/registration-token/registration-token.js';
import type { RegistrationTokenRepository } from '@/domain/registration-token/registration-token-repository.js';
import type { PrismaClient } from '../../../generated/prisma/client.js';

export class prismaRegistrationTokenRepository implements RegistrationTokenRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async find(token: string): Promise<RegistrationToken | null> {
		const registrationToken = await this.prismaClient.registrationToken.findFirst({ where: { token } });
		if (!registrationToken) return null;

		return registrationToken;
	}
}
