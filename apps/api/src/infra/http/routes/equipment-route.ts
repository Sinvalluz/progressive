import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { EquipmentAlreadyExists } from '@/application/erros/equipment-already-exists.js';
import type CreateEquipment from '@/application/use-case/create-equipment.js';
import { paths } from '@/infra/config/path.js';
import { jwtVerify } from '../decorators/jwt-verify.js';
import { EquipmentCreateDto, EquipmentResponseDto } from '../dto/equipment-dto.js';

export default class EquipmentRoute {
	constructor(
		private readonly fastify: FastifyInstance,
		private readonly createEquipment: CreateEquipment,
	) {}

	async create() {
		this.fastify.withTypeProvider<ZodTypeProvider>().route({
			method: 'POST',
			url: paths.equipment.create,
			schema: {
				body: EquipmentCreateDto,
				response: {
					201: EquipmentResponseDto,
					403: z.object({ message: z.string() }),
					409: z.object({ message: z.string() }),
					500: z.object({ message: z.string() }),
				},
			},
			preHandler: jwtVerify,
			handler: async (request, reply) => {
				try {
					const { user, body } = request;

					if (user.role !== 'ADMIN') {
						return reply.code(403).send({ message: 'Esta ação exige privilégios de administrador.' });
					}

					const { id, name, createdAt, updatedAt } = await this.createEquipment.execute({
						name: body.name.toLowerCase(),
					});

					return reply.code(201).send({ id, name, createdAt, updatedAt });
				} catch (error) {
					if (error instanceof EquipmentAlreadyExists) {
						return reply.code(409).send({
							message: error.message,
						});
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
