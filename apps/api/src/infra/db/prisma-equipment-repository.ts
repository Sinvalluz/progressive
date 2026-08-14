import type { Equipment } from '@/domain/equipment/equipment.js';
import type { EquipmentRepository } from '@/domain/equipment/equipment-repository.js';
import type { PrismaClient } from '../../../generated/prisma/client.js';

export default class PrismaEquipmentRepository implements EquipmentRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async create(equipment: Equipment): Promise<Equipment> {
		return this.prismaClient.equipment.create({
			data: {
				id: equipment.id,
				name: equipment.name,
				createdAt: equipment.createdAt,
				updatedAt: equipment.updatedAt,
			},
		});
	}
	async findById(id: string): Promise<Equipment | null> {
		return this.prismaClient.equipment.findUnique({
			where: {
				id,
			},
		});
	}

	async findByName(name: string): Promise<Equipment | null> {
		return this.prismaClient.equipment.findUnique({
			where: {
				name,
			},
		});
	}
	async delete(id: string): Promise<void> {
		await this.prismaClient.equipment.delete({
			where: {
				id,
			},
		});
	}
}
