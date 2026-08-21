import { randomUUID } from 'node:crypto';
import MuscleGroup from '@/domain/muscle-group/muscle-group.js';
import type { MuscleGroupRepository } from '@/domain/muscle-group/muscle-group-repository.js';
import { MuscleGroupAlreadyExists } from '../erros/muscle-group-already-exists.js';
import type { UseCase } from './use-case.js';

type CreateMuscleGroupInput = Omit<MuscleGroup, 'id' | 'createdAt' | 'updatedAt'>;
type CreateMuscleGroupOutput = MuscleGroup;

export default class CreateMuscleGroup implements UseCase<CreateMuscleGroupInput, CreateMuscleGroupOutput> {
	constructor(private readonly muscleGroupRepository: MuscleGroupRepository) {}

	async execute(createMuscleGroupInput: CreateMuscleGroupInput): Promise<CreateMuscleGroupOutput> {
		const muscleGroupExists = await this.muscleGroupRepository.findByName(
			createMuscleGroupInput.name.toLowerCase(),
		);

		if (muscleGroupExists) {
			throw new MuscleGroupAlreadyExists();
		}

		const equipment = new MuscleGroup(
			randomUUID(),
			createMuscleGroupInput.name.toLowerCase(),
			new Date(),
			new Date(),
		);

		return await this.muscleGroupRepository.create(equipment);
	}
}
