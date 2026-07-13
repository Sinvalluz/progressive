import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import type { CreateRefreshToken } from '@/application/use-case/create-refresh-token.js';
import type { LoginUser } from '@/application/use-case/login-user.js';
import { paths } from '@/infra/config/path.js';
import { LoginRequestSchema } from '../dto/login-request.js';
import { LoginResponseSchema } from '../dto/login-response.js';

export class LoginRoute {
	constructor(
		private readonly fastify: FastifyInstance,
		private readonly loginUser: LoginUser,
		private readonly createRefreshToken: CreateRefreshToken,
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

				const user = await this.loginUser.execute({
					email: body.email,
					password: body.password,
				});

				const accessToken = await reply.accessTokenJwtSign(
					{
						id: user.id,
						email: user.email,
						role: user.role,
					},
					{ expiresIn: '1h' },
				);

				const refreshToken = await reply.refreshTokenJwtSign(
					{
						id: user.id,
						email: user.email,
						role: user.role,
					},
					{ expiresIn: '7d' },
				);

				await this.createRefreshToken.execute({ userId: user.id, refreshToken });

				return reply
					.setCookie('refreshToken', refreshToken, {
						path: '/',
						secure: true,
						signed: true,
						httpOnly: true,
						sameSite: 'lax',
					})
					.code(200)
					.send({ accessToken });
			},
		});
	}
}
