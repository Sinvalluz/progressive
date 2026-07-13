import type { FastifyJwtNamespace } from '@fastify/jwt';
import type { FastifyReply, FastifyRequest } from 'fastify';

declare module 'fastify' {
	interface FastifyReply extends FastifyJwtNamespace<{ namespace: 'accessToken' }> {}
	interface FastifyRequest extends FastifyJwtNamespace<{ namespace: 'accessToken' }> {}
}

declare module 'fastify' {
	interface FastifyReply extends FastifyJwtNamespace<{ namespace: 'refreshToken' }> {}
	interface FastifyRequest extends FastifyJwtNamespace<{ namespace: 'refreshToken' }> {}
}

export async function jwtVerify(request: FastifyRequest, reply: FastifyReply) {
	try {
		const token = request.headers.authorization?.replace('Bearer ', '');

		if (!token) {
			return reply.code(401).send({ message: 'Token não informado' });
		}

		const user = await request.accessTokenJwtVerify(token);
		console.log(user);
		console.log(request.user);
	} catch (error) {
		return reply.code(401).send({ message: error instanceof Error ? error.message : 'Unauthorized' });
	}
}
