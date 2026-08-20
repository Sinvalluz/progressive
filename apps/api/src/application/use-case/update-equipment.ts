import { Equipment } from '@/domain/equipment/equipment.js';
import type { EquipmentRepository } from '@/domain/equipment/equipment-repository.js';
import { EquipmentNotFound } from '../erros/equipment-not-found.js';
import type { UseCase } from './use-case.js';

type UpdateEquipmentInput = Omit<Equipment, 'createdAt' | 'updatedAt'>;

type UpdateEquipmentOutput = undefined;

export default class UpdateEquipment implements UseCase<UpdateEquipmentInput, UpdateEquipmentOutput> {
	constructor(private readonly equipmentRepository: EquipmentRepository) {}
	async execute(updateEquipmentInput: UpdateEquipmentInput): Promise<UpdateEquipmentOutput> {
		const equipment = await this.equipmentRepository.findById(updateEquipmentInput.id);

		if (!equipment) throw new EquipmentNotFound();

		const equipmentUpdated = new Equipment(
			equipment.id,
			updateEquipmentInput.name.toLowerCase() === equipment.name
				? equipment.name
				: updateEquipmentInput.name.toLowerCase(),
			equipment.createdAt,
			new Date(),
		);

		await this.equipmentRepository.update(equipmentUpdated);
	}
}
