import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { EmailIsAlreadyInUse } from '@/application/erros/email-is-already-in-use.js';
import { InvalidRegistrationToken } from '@/application/erros/invalid-registration-token.js';
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
					401: z.object({ message: z.string() }),
					409: z.object({ message: z.string() }),
					500: z.object({ message: z.string() }),
				},
			},
			handler: async (request, reply) => {
				try {
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
				} catch (error) {
					if (error instanceof InvalidRegistrationToken) {
						return reply.code(401).send({ message: error.message });
					}

					if (error instanceof EmailIsAlreadyInUse) {
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
