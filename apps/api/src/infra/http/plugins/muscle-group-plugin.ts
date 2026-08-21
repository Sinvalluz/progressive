import type { FastifyInstance } from 'fastify';
import CreateMuscleGroup from '@/application/use-case/create-muscle-group.js';
import DeleteMuscleGroup from '@/application/use-case/delete-muscle-group.js';
import ListAllMuscleGroups from '@/application/use-case/list-all-muscle-groups.js';
import UpdateMuscleGroup from '@/application/use-case/update-muscle-group.js';
import { prisma } from '@/infra/db/prisma.js';
import PrismaMuscleGroupRepository from '@/infra/db/prisma-muscle-group-repository.js';
import MuscleGroupRoute from '../routes/muscle-group-route.js';

export default function muscleGroupPlugin(fastifyInstance: FastifyInstance) {
	const muscleGroupRepository = new PrismaMuscleGroupRepository(prisma);
	const createMuscleGroup = new CreateMuscleGroup(muscleGroupRepository);
	const listAllMuscleGroup = new ListAllMuscleGroups(muscleGroupRepository);
	const updateMuscleGroup = new UpdateMuscleGroup(muscleGroupRepository);
	const deleteMuscleGroup = new DeleteMuscleGroup(muscleGroupRepository);

	const muscleGroupRoute = new MuscleGroupRoute(
		fastifyInstance,
		createMuscleGroup,
		listAllMuscleGroup,
		updateMuscleGroup,
		deleteMuscleGroup,
	);

	muscleGroupRoute.create();
	muscleGroupRoute.listALL();
	muscleGroupRoute.update();
	muscleGroupRoute.delete();
}
