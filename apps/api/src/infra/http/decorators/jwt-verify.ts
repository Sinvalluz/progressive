import type { FastifyReply, FastifyRequest } from 'fastify';

interface JwtPayload {
	id: string;
	email: string;
	role: 'USER' | 'ADMIN';
	iat: number;
	exp: number;
}
declare module '@fastify/jwt' {
	interface FastifyJWT {
		payload: JwtPayload;
		user: JwtPayload;
	}
}

export async function jwtVerify(request: FastifyRequest, reply: FastifyReply) {
	try {
		await request.jwtVerify();
	} catch (error) {
		return reply.code(401).send({ message: error instanceof Error ? error.message : 'Unauthorized' });
	}
}
