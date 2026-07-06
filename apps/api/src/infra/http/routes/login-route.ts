import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import type { LoginUser } from '@/application/use-case/login-user.js';
import { paths } from '@/infra/config/path.js';
import { LoginRequestSchema } from '../dto/login-request.js';
import { LoginResponseSchema } from '../dto/login-response.js';

export class LoginRoute {
	constructor(
		private readonly fastify: FastifyInstance,
		private readonly loginUser: LoginUser,
	) {}
	execute() {
		this.fastify.withTypeProvider<ZodTypeProvider>().route({
			method: 'POST',
			url: paths.auth.login,
			schema: {
				body: LoginRequestSchema,
				response: {
					200: LoginResponseSchema,
				},
			},
			handler: async (request, reply) => {
				const body = request.body;

				const { user, token } = await this.loginUser.execute({
					email: body.email,
					password: body.password,
				});

				return reply.status(200).send({ token, user });
			},
		});
	}
}
