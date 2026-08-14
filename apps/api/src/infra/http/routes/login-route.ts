import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { InvalidCredentialsError } from '@/application/erros/invalid-credentials.js';
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
					409: z.object({ message: z.string() }),
					500: z.object({ message: z.string() }),
				},
			},
			handler: async (request, reply) => {
				try {
					const body = request.body;

					const user = await this.loginUser.execute({
						email: body.email,
						password: body.password,
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
							signed: true,
							httpOnly: true,
							sameSite: 'lax',
						})
						.code(200)
						.send();
				} catch (error) {
					if (error instanceof InvalidCredentialsError) {
						return reply.code(409).send({ message: error.message });
					}

					console.error(error);
					return reply.code(500).send({
						message: 'Erro interno do servidor',
					});
				}
			},
		});
	}
}
