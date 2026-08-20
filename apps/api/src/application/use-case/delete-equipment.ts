import type { EquipmentRepository } from '@/domain/equipment/equipment-repository.js';
import { EquipmentNotFound } from '../erros/equipment-not-found.js';
import type { UseCase } from './use-case.js';

type DeleteEquipmentInput = { id: string };
type DeleteEquipmentOutput = undefined;

export default class DeleteEquipment implements UseCase<DeleteEquipmentInput, DeleteEquipmentOutput> {
	constructor(private readonly equipmentRepository: EquipmentRepository) {}

	async execute(deleteEquipmentInput: DeleteEquipmentInput): Promise<DeleteEquipmentOutput> {
		const equipmentExists = await this.equipmentRepository.findById(deleteEquipmentInput.id);

		if (!equipmentExists) throw new EquipmentNotFound();

		await this.equipmentRepository.delete(deleteEquipmentInput.id);
	}
}
