import type { Equipment } from './equipment.js';

export interface EquipmentRepository {
	create(equipment: Equipment): Promise<Equipment>;
	findById(id: string): Promise<Equipment | null>;
	findByName(name: string): Promise<Equipment | null>;
	delete(id: string): Promise<void>;
}
