import fastifyCookie from '@fastify/cookie';
import { fastifyCors } from '@fastify/cors';
import jwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import ScalarApiReference from '@scalar/fastify-api-reference';
import fastify from 'fastify';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { env } from './infra/config/env.js';
import { LoginPlugin } from './infra/http/plugins/login-plugin.js';
import { RegisterPlugin } from './infra/http/plugins/register-plugin.js';

function main() {
	const app = fastify();

	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.register(fastifyCors, {
		origin: true,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
		credentials: true,
	});

	app.register(jwt, {
		secret: env.JWT_SECRET,
		cookie: { cookieName: 'refreshToken', signed: true },
	});

	app.register(fastifyCookie);

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

	app.register(RegisterPlugin);
	app.register(LoginPlugin);

	app.register(ScalarApiReference, {
		routePrefix: '/docs',
	});

	app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
		console.log('🚀 servidor Rodando na porta http://localhost:3333');
		console.log('📖 Documentação disponível em http://localhost:3333/docs');
	});
}

main();
