import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import type { CreateUser } from '@/application/use-case/create-user.js';
import { paths } from '@/infra/config/path.js';
import { RegisterRequestSchema } from '../dto/register-request.js';
import { RegisterResponseSchema } from '../dto/register-response.js';

export class RegisterRoute {
	constructor(
		private readonly fastify: FastifyInstance,
		private readonly createUser: CreateUser,
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

				const user = await this.createUser.execute({
					name: body.name,
					email: body.email,
					password: body.password,
					registrationToken: body.registrationToken,
				});

				return reply.status(201).send({
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
					imgUrl: user.imgUrl,
					createAt: user.createAt,
					updateAt: user.updateAt,
				});
			},
		});
	}
}
