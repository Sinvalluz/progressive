import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import type { RegisterUser } from '@/application/use-case/register-user.js';
import { paths } from '@/infra/config/path.js';
import { RegisterRequestSchema } from '../dto/register-request.js';
import { RegisterResponseSchema } from '../dto/register-response.js';

export class RegisterRoute {
	constructor(
		private readonly fastify: FastifyInstance,
		private readonly RegisterUser: RegisterUser,
	) {}

	execute() {
		this.fastify.withTypeProvider<ZodTypeProvider>().route({
			method: 'POST',
			url: paths.auth.register,
			schema: {
				body: RegisterRequestSchema,
				response: {
					201: RegisterResponseSchema,
				},
			},
			handler: async (request, reply) => {
				const body = request.body;

				const user = await this.RegisterUser.execute({
					name: body.name,
					email: body.email,
					password: body.password,
					registrationToken: body.registrationToken,
				});

				const token = await reply.jwtSign(
					{
						id: user.id,
						email: user.email,
						role: user.role,
					},
					{ expiresIn: '7d' },
				);

				return reply
					.setCookie('token', token, {
						path: '/',
						secure: true,
						httpOnly: true,
						signed: true,
						sameSite: 'lax',
					})
					.code(201)
					.send({});
			},
		});
	}
}
