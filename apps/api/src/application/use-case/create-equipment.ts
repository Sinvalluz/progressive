import { randomUUID } from 'node:crypto';
import { Equipment } from '@/domain/equipment/equipment.js';
import type { EquipmentRepository } from '@/domain/equipment/equipment-repository.js';
import { EquipmentAlreadyExists } from '../erros/equipment-already-exists.js';
import type { UseCase } from './use-case.js';

type CreateEquipmentInput = Omit<Equipment, 'id' | 'createdAt' | 'updatedAt'>;
type CreateEquipmentOutput = Equipment;

export default class CreateEquipment implements UseCase<CreateEquipmentInput, CreateEquipmentOutput> {
	constructor(private readonly equipmentRepository: EquipmentRepository) {}

	async execute(createEquipmentInput: CreateEquipmentInput): Promise<CreateEquipmentOutput> {
		const equipmentExists = await this.equipmentRepository.findByName(createEquipmentInput.name);

		if (equipmentExists) {
			throw new EquipmentAlreadyExists();
		}

		const equipment = new Equipment(randomUUID(), createEquipmentInput.name, new Date(), new Date());

		return await this.equipmentRepository.create(equipment);
	}
}
