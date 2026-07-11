import type { FastifyInstance } from 'fastify';
import type { TokenAuthenticationGateway } from '@/application/gateway/token-authentication-gateway.js';

interface TokenPayload {
	id: string;
	email: string;
	name: string;
}

export class JwtGateway implements TokenAuthenticationGateway {
	constructor(private readonly fastify: FastifyInstance) {}

	sign(payload: TokenPayload, options?: { expiresIn: string | number }): string {
		return this.fastify.jwt.sign(payload, { expiresIn: options?.expiresIn });
	}
	verify(token: string): TokenPayload {
		return this.fastify.jwt.verify(token);
	}
}
