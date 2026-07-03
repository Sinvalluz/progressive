import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { env } from '../config/env.js';

export class PrismaGateway extends PrismaClient {
	constructor() {
		const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
		super({ adapter });
	}
}
