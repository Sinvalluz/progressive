import type MuscleGroup from '@/domain/muscle-group/muscle-group.js';
import type { MuscleGroupRepository } from '@/domain/muscle-group/muscle-group-repository.js';
import type { UseCase } from './use-case.js';

type ListAllMuscleGroupsInput = undefined;
type ListAllMuscleGroupsOutput = MuscleGroup[];

export default class ListAllMuscleGroups implements UseCase<ListAllMuscleGroupsInput, ListAllMuscleGroupsOutput> {
	constructor(private readonly muscleGroupRepository: MuscleGroupRepository) {}

	async execute(): Promise<ListAllMuscleGroupsOutput> {
		return await this.muscleGroupRepository.findAll();
	}
}
