import type { FastifyReply, FastifyRequest } from 'fastify';

export async function adminVerify(request: FastifyRequest, reply: FastifyReply) {
	const { user } = request;

	if (user.role !== 'ADMIN') {
		return reply.code(403).send({ message: 'Esta ação exige privilégios de administrador.' });
	}
}
