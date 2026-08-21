import type MuscleGroup from './muscle-group.js';

export interface MuscleGroupRepository {
	create(muscleGroup: MuscleGroup): Promise<MuscleGroup>;
	findById(id: string): Promise<MuscleGroup | null>;
	findAll(): Promise<MuscleGroup[]>;
	findByName(name: string): Promise<MuscleGroup | null>;
	update(muscleGroup: MuscleGroup): Promise<MuscleGroup>;
	delete(id: string): Promise<void>;
}
