import type { Equipment } from '@/domain/equipment/equipment.js';
import type { EquipmentRepository } from '@/domain/equipment/equipment-repository.js';
import type { UseCase } from './use-case.js';

type ListAllEquipmentsInput = undefined;
type ListAllEquipmentsOutput = Equipment[];

export default class ListAllEquipments implements UseCase<ListAllEquipmentsInput, ListAllEquipmentsOutput> {
	constructor(private readonly equipmentRepository: EquipmentRepository) {}

	async execute(): Promise<ListAllEquipmentsOutput> {
		return await this.equipmentRepository.findAll();
	}
}
