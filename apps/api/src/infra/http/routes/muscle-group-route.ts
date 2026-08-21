import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import type CreateMuscleGroup from '@/application/use-case/create-muscle-group.js';
import type DeleteMuscleGroup from '@/application/use-case/delete-muscle-group.js';
import type ListAllMuscleGroups from '@/application/use-case/list-all-muscle-groups.js';
import type UpdateMuscleGroup from '@/application/use-case/update-muscle-group.js';
import { paths } from '@/infra/config/path.js';
import { adminVerify } from '../decorators/admin-verify.js';
import { jwtVerify } from '../decorators/jwt-verify.js';
import { MuscleGroupCreateDto, MuscleGroupResponseDto, MuscleGroupUpdateDto } from '../dto/muscle-group-dto.js';

export default class MuscleGroupRoute {
	constructor(
		private readonly fastify: FastifyInstance,
		private readonly createMuscleGroup: CreateMuscleGroup,
		private readonly listAllMuscleGroup: ListAllMuscleGroups,
		private readonly updateMuscleGroup: UpdateMuscleGroup,
		private readonly deleteMuscleGroup: DeleteMuscleGroup,
	) {}

	async create() {
		this.fastify.withTypeProvider<ZodTypeProvider>().route({
			method: 'POST',
			url: paths.muscleGroup,
			schema: {
				body: MuscleGroupCreateDto,
				response: {
					201: MuscleGroupResponseDto,
				},
			},
			preHandler: [jwtVerify, adminVerify],
			handler: async (request, reply) => {
				const { body } = request;

				const { id, name, createdAt, updatedAt } = await this.createMuscleGroup.execute({
					name: body.name,
				});

				return reply.code(201).send({ id, name, createdAt, updatedAt });
			},
		});
	}

	async listALL() {
		this.fastify.withTypeProvider<ZodTypeProvider>().route({
			method: 'GET',
			url: paths.muscleGroup,
			schema: {
				response: {
					200: MuscleGroupResponseDto.array(),
				},
			},
			preHandler: [jwtVerify],
			handler: async (_, reply) => {
				const equipments = await this.listAllMuscleGroup.execute();

				return reply.code(200).send(equipments);
			},
		});
	}

	async update() {
		this.fastify.withTypeProvider<ZodTypeProvider>().route({
			method: 'PUT',
			url: `${paths.muscleGroup}/:id`,
			schema: {
				params: z.object({
					id: z.uuid('O id como parâmetro é obrigatório ou está incorreto'),
				}),
				body: MuscleGroupUpdateDto,
				response: {
					204: z.object({ message: z.string() }),
				},
			},
			preHandler: [jwtVerify, adminVerify],
			handler: async (request, reply) => {
				console.log(request.params);
				const { body, params } = request;

				await this.updateMuscleGroup.execute({ id: params.id, name: body.name });

				return reply.code(204).send({ message: 'Grupo muscular atualizado com sucesso' });
			},
		});
	}

	async delete() {
		this.fastify.withTypeProvider<ZodTypeProvider>().route({
			method: 'DELETE',
			url: `${paths.muscleGroup}/:id`,
			schema: {
				params: z.object({
					id: z.uuid('O id como parâmetro é obrigatório ou está incorreto'),
				}),
				response: {
					204: z.object({ message: z.string() }),
				},
			},
			preHandler: [jwtVerify, adminVerify],
			handler: async (request, reply) => {
				const { params } = request;

				await this.deleteMuscleGroup.execute({ id: params.id });

				return reply.code(204).send({ message: 'Grupo muscular deletado com sucesso' });
			},
		});
	}
}
