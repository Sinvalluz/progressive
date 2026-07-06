import type { FastifyInstance } from 'fastify';
import type { TokenAuthenticationGateway } from '@/application/gateway/token-authentication-gateway.js';

interface TokenPayload {
	id: string;
	email: string;
	name: string;
}

export class JwtGateway implements TokenAuthenticationGateway<TokenPayload> {
	constructor(private readonly fastify: FastifyInstance) {}

	sign(payload: TokenPayload): string {
		return this.fastify.jwt.sign(payload);
	}
	verify(token: string): TokenPayload {
		return this.fastify.jwt.verify(token);
	}
}
