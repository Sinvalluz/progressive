import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import type CreateEquipment from '@/application/use-case/create-equipment.js';
import type DeleteEquipment from '@/application/use-case/delete-equipment.js';
import type ListAllEquipments from '@/application/use-case/list-all-equipments.js';
import type UpdateEquipment from '@/application/use-case/update-equipment.js';
import { paths } from '@/infra/config/path.js';
import { adminVerify } from '../decorators/admin-verify.js';
import { jwtVerify } from '../decorators/jwt-verify.js';
import { EquipmentCreateDto, EquipmentResponseDto, EquipmentUpdateDto } from '../dto/equipment-dto.js';

export default class EquipmentRoute {
	constructor(
		private readonly fastify: FastifyInstance,
		private readonly createEquipment: CreateEquipment,
		private readonly listAllEquipment: ListAllEquipments,
		private readonly updateEquipment: UpdateEquipment,
		private readonly deleteEquipment: DeleteEquipment,
	) {}

	async create() {
		this.fastify.withTypeProvider<ZodTypeProvider>().route({
			method: 'POST',
			url: paths.equipment,
			schema: {
				body: EquipmentCreateDto,
				response: {
					201: EquipmentResponseDto,
				},
			},
			preHandler: [jwtVerify, adminVerify],
			handler: async (request, reply) => {
				const { body } = request;

				const { id, name, createdAt, updatedAt } = await this.createEquipment.execute({
					name: body.name,
				});

				return reply.code(201).send({ id, name, createdAt, updatedAt });
			},
		});
	}

	async listALL() {
		this.fastify.withTypeProvider<ZodTypeProvider>().route({
			method: 'GET',
			url: paths.equipment,
			schema: {
				response: {
					200: EquipmentResponseDto.array(),
				},
			},
			preHandler: [jwtVerify],
			handler: async (_, reply) => {
				const equipments = await this.listAllEquipment.execute();

				return reply.code(200).send(equipments);
			},
		});
	}

	async update() {
		this.fastify.withTypeProvider<ZodTypeProvider>().route({
			method: 'PUT',
			url: paths.equipment,
			schema: {
				params: z.uuid('O id como parâmetro é obrigatório ou está incorreto'),
				body: EquipmentUpdateDto,
				response: {
					204: z.object({ message: z.string() }),
				},
			},
			preHandler: [jwtVerify, adminVerify],
			handler: async (request, reply) => {
				const { body, params } = request;

				await this.updateEquipment.execute({ id: params, name: body.name });

				return reply.code(204).send({ message: 'Equipamento atualizado com sucesso' });
			},
		});
	}

	async delete() {
		this.fastify.withTypeProvider<ZodTypeProvider>().route({
			method: 'DELETE',
			url: paths.equipment,
			schema: {
				params: z.uuid('O id como parâmetro é obrigatório ou está incorreto'),
				response: {
					204: z.object({ message: z.string() }),
				},
			},
			preHandler: [jwtVerify, adminVerify],
			handler: async (request, reply) => {
				const { params } = request;

				await this.deleteEquipment.execute({ id: params });

				return reply.code(204).send({ message: 'Equipamento deletado com sucesso' });
			},
		});
	}
}
