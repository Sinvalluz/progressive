import type { FastifyInstance } from 'fastify';
import CreateEquipment from '@/application/use-case/create-equipment.js';
import { prisma } from '@/infra/db/prisma.js';
import PrismaEquipmentRepository from '@/infra/db/prisma-equipment-repository.js';
import EquipmentRoute from '../routes/equipment-route.js';

export default function equipmentPlugin(fastifyInstance: FastifyInstance) {
	const equipmentRepository = new PrismaEquipmentRepository(prisma);
	const createEquipment = new CreateEquipment(equipmentRepository);

	new EquipmentRoute(fastifyInstance, createEquipment).create();
}
