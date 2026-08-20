import type { Equipment } from './equipment.js';

export interface EquipmentRepository {
	create(equipment: Equipment): Promise<Equipment>;
	findById(id: string): Promise<Equipment | null>;
	findAll(): Promise<Equipment[]>;
	findByName(name: string): Promise<Equipment | null>;
	update(equipment: Equipment): Promise<Equipment>;
	delete(id: string): Promise<void>;
}
