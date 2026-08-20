import type { FastifyInstance } from 'fastify';
import CreateEquipment from '@/application/use-case/create-equipment.js';
import DeleteEquipment from '@/application/use-case/delete-equipment.js';
import ListAllEquipments from '@/application/use-case/list-all-equipments.js';
import UpdateEquipment from '@/application/use-case/update-equipment.js';
import { prisma } from '@/infra/db/prisma.js';
import PrismaEquipmentRepository from '@/infra/db/prisma-equipment-repository.js';
import EquipmentRoute from '../routes/equipment-route.js';

export default function equipmentPlugin(fastifyInstance: FastifyInstance) {
	const equipmentRepository = new PrismaEquipmentRepository(prisma);
	const createEquipment = new CreateEquipment(equipmentRepository);
	const listAllEquipment = new ListAllEquipments(equipmentRepository);
	const updateEquipment = new UpdateEquipment(equipmentRepository);
	const deleteEquipment = new DeleteEquipment(equipmentRepository);

	const equipmentRoute = new EquipmentRoute(
		fastifyInstance,
		createEquipment,
		listAllEquipment,
		updateEquipment,
		deleteEquipment,
	);

	equipmentRoute.create();
	equipmentRoute.listALL();
	equipmentRoute.update();
	equipmentRoute.delete();
}
