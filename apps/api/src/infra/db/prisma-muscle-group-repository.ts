import type MuscleGroup from '@/domain/muscle-group/muscle-group.js';
import type { MuscleGroupRepository } from '@/domain/muscle-group/muscle-group-repository.js';
import type { PrismaClient } from '../../../generated/prisma/client.js';

export default class PrismaMuscleGroupRepository implements MuscleGroupRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async create(muscleGroup: MuscleGroup): Promise<MuscleGroup> {
		return await this.prismaClient.muscleGroup.create({
			data: {
				id: muscleGroup.id,
				name: muscleGroup.name,
				createdAt: muscleGroup.createdAt,
				updatedAt: muscleGroup.updatedAt,
			},
		});
	}
	async findById(id: string): Promise<MuscleGroup | null> {
		return await this.prismaClient.muscleGroup.findUnique({ where: { id } });
	}
	async findAll(): Promise<MuscleGroup[]> {
		return await this.prismaClient.muscleGroup.findMany();
	}
	async findByName(name: string): Promise<MuscleGroup | null> {
		return await this.prismaClient.muscleGroup.findUnique({ where: { name } });
	}
	async update(muscleGroup: MuscleGroup): Promise<MuscleGroup> {
		return await this.prismaClient.equipment.update({
			where: { id: muscleGroup.id },
			data: {
				name: muscleGroup.name,
				updatedAt: muscleGroup.updatedAt,
			},
		});
	}
	async delete(id: string): Promise<void> {
		await this.prismaClient.muscleGroup.delete({ where: { id } });
	}
}
