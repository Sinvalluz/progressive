import type { FastifyReply, FastifyRequest } from 'fastify';

export async function jwtVerify(request: FastifyRequest, reply: FastifyReply) {
	try {
		await request.jwtVerify();
	} catch (error) {
		return reply.code(401).send({ message: error instanceof Error ? error.message : 'Unauthorized' });
	}
}
