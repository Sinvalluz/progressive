import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import type { ListUser } from '@/application/use-case/list-user.js';
import { paths } from '@/infra/config/path.js';
import { jwtVerify } from '../decorators/jwt-verify.js';

declare module '@fastify/jwt' {
	interface FastifyJWT {
		user: {
			id: string;
			email: string;
			name: string;
		};
	}
}

export class MeRoute {
	constructor(
		private readonly fastify: FastifyInstance,
		private readonly listUser: ListUser,
	) {}

	execute() {
		this.fastify.withTypeProvider<ZodTypeProvider>().route({
			method: 'GET',
			url: paths.me,
			onRequest: jwtVerify,
			handler: async (request, reply) => {
				console.log(request.user);

				const user = await this.listUser.execute({
					id: request.user.id,
				});

				return reply.code(200).send({ ...user });
			},
		});
	}
}
