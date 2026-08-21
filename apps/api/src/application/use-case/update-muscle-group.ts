import MuscleGroup from '@/domain/muscle-group/muscle-group.js';
import type { MuscleGroupRepository } from '@/domain/muscle-group/muscle-group-repository.js';
import { MuscleGroupNotFound } from '../erros/muscle-group-not-found.js';
import type { UseCase } from './use-case.js';

type UpdateMuscleGroupInput = Omit<MuscleGroup, 'createdAt' | 'updatedAt'>;

type UpdateMuscleGroupOutput = undefined;

export default class UpdateMuscleGroup implements UseCase<UpdateMuscleGroupInput, UpdateMuscleGroupOutput> {
	constructor(private readonly muscleGroupRepository: MuscleGroupRepository) {}
	async execute(updateMuscleGroupInput: UpdateMuscleGroupInput): Promise<UpdateMuscleGroupOutput> {
		const muscleGroup = await this.muscleGroupRepository.findById(updateMuscleGroupInput.id);

		if (!muscleGroup) throw new MuscleGroupNotFound();

		const muscleGroupUpdated = new MuscleGroup(
			muscleGroup.id,
			updateMuscleGroupInput.name.toLowerCase() === muscleGroup.name
				? muscleGroup.name
				: updateMuscleGroupInput.name.toLowerCase(),
			muscleGroup.createdAt,
			new Date(),
		);

		await this.muscleGroupRepository.update(muscleGroupUpdated);
	}
}
