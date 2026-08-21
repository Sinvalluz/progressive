import type { MuscleGroupRepository } from '@/domain/muscle-group/muscle-group-repository.js';
import { MuscleGroupNotFound } from '../erros/muscle-group-not-found.js';
import type { UseCase } from './use-case.js';

type DeleteMuscleGroupInput = { id: string };
type DeleteMuscleGroupOutput = undefined;

export default class DeleteMuscleGroup implements UseCase<DeleteMuscleGroupInput, DeleteMuscleGroupOutput> {
	constructor(private readonly muscleGroupRepository: MuscleGroupRepository) {}

	async execute(deleteMuscleGroupInput: DeleteMuscleGroupInput): Promise<DeleteMuscleGroupOutput> {
		const muscleGroupExists = await this.muscleGroupRepository.findById(deleteMuscleGroupInput.id);

		if (!muscleGroupExists) throw new MuscleGroupNotFound();

		await this.muscleGroupRepository.delete(deleteMuscleGroupInput.id);
	}
}
