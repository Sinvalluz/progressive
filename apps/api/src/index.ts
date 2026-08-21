import fastifyCookie from '@fastify/cookie';
import { fastifyCors } from '@fastify/cors';
import jwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import ScalarApiReference from '@scalar/fastify-api-reference';
import fastify, { type FastifyError } from 'fastify';
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { ZodError } from 'zod';
import AppError from './application/erros/app-error.js';
import { env } from './infra/config/env.js';
import equipmentPlugin from './infra/http/plugins/equipment-plugin.js';
import { LoginPlugin } from './infra/http/plugins/login-plugin.js';
import logoutPlugin from './infra/http/plugins/logout-plugin.js';
import { mePlugin } from './infra/http/plugins/me-plugin.js';
import muscleGroupPlugin from './infra/http/plugins/muscle-group-plugin.js';
import { RegisterPlugin } from './infra/http/plugins/register-plugin.js';

function main() {
	const app = fastify().withTypeProvider<ZodTypeProvider>();

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.register(fastifyCors, {
		origin: true,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
		credentials: true,
	});

	app.register(fastifyCookie, {
		secret: env.COOKIE_SECRET,
	});

	app.register(jwt, {
		secret: env.JWT_SECRET,
		messages: {
			badRequestErrorMessage: 'O formato esperado é: Authorization: Bearer [token]',
			badCookieRequestErrorMessage: 'Não foi possível interpretar o cookie da requisição.',
			noAuthorizationInHeaderMessage: 'Nenhum cabeçalho Authorization foi encontrado na requisição.',
			noAuthorizationInCookieMessage: 'Nenhum token de autorização foi encontrado nos cookies da requisição.',
			authorizationTokenExpiredMessage: 'O token de autorização expirou.',
			authorizationTokenUntrusted: 'O token de autorização não é confiável.',
			authorizationTokenUnsigned: 'O token de autorização não está assinado.',
			authorizationTokenInvalid: (err) => {
				return `O token de autorização é inválido: ${err.message}`;
			},
		},
		cookie: {
			cookieName: 'token',
			signed: true,
		},
	});

	app.register(fastifySwagger, {
		openapi: {
			info: {
				title: 'Progressive API',
				description: 'Sample backend service',
				version: '1.0.0',
			},
			servers: [],
		},
		transform: jsonSchemaTransform,
	});

	app.setErrorHandler((error: FastifyError, _, reply) => {
		if (error instanceof AppError) {
			return reply.code(error.statusCode).send({
				message: error.message,
			});
		}

		if (error instanceof ZodError) {
			return reply.code(400).send({
				message: 'Erro de validação',
				errors: error.issues.map((issue) => ({
					field: issue.path.join('.'),
					message: issue.message,
				})),
			});
		}

		if (error.code?.startsWith('FST_')) {
			return reply.code(400).send({
				message: error.message,
			});
		}

		console.error(error);

		return reply.code(500).send({
			message: 'Erro interno do servidor',
		});
	});

	// Registro de rotas
	app.register(RegisterPlugin);
	app.register(LoginPlugin);
	app.register(mePlugin);
	app.register(logoutPlugin);
	app.register(equipmentPlugin);
	app.register(muscleGroupPlugin);

	app.register(ScalarApiReference, {
		routePrefix: '/docs',
	});

	app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
		console.log('🚀 servidor Rodando na porta http://localhost:3333');
		console.log('📖 Documentação disponível em http://localhost:3333/docs');
	});
}

main();
