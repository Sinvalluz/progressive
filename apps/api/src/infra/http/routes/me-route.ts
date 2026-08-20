import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import type { ListUser } from '@/application/use-case/list-user.js';
import { paths } from '@/infra/config/path.js';
import { jwtVerify } from '../decorators/jwt-verify.js';
import { MeResponseSchema } from '../dto/me-response.js';

export class MeRoute {
	constructor(
		private readonly fastify: FastifyInstance,
		private readonly listUser: ListUser,
	) {}

	execute() {
		this.fastify.withTypeProvider<ZodTypeProvider>().route({
			method: 'GET',
			url: paths.me,
			preHandler: jwtVerify,
			schema: {
				response: {
					200: MeResponseSchema,
				},
			},
			handler: async (request, reply) => {
				const userPayload = request.user;

				const user = await this.listUser.execute({ id: userPayload.id });

				reply.code(200).send({
					id: user.id,
					email: user.email,
					name: user.name,
					role: user.role,
					imgUrl: user.imgUrl,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				});
			},
		});
	}
}
