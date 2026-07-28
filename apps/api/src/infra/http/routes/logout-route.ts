import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { paths } from '@/infra/config/path.js';

export class LogoutRoute {
	constructor(private readonly fastify: FastifyInstance) {}
	execute() {
		this.fastify.withTypeProvider<ZodTypeProvider>().route({
			method: 'GET',
			url: paths.logout,
			handler: async (_request, reply) => {
				reply.clearCookie('token', { path: '/' });
			},
		});
	}
}
