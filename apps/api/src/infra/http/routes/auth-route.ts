import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import type { CreateUser } from '@/application/use-cases/create-user.js';
import { RegisterRequestSchema } from '../dto/register-request.js';
import { RegisterResponseSchema } from '../dto/register-response.js';

export class AuthRoute {
	constructor(
		private readonly fastify: FastifyInstance,
		private readonly createUser: CreateUser,
	) {}

	async register() {
		this.fastify.withTypeProvider<ZodTypeProvider>().route({
			method: 'POST',
			url: '/auth/register',
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
				});

				return reply.status(201).send({
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
					createAt: user.createAt,
					updateAt: user.updateAt,
				});
			},
		});
	}
}
