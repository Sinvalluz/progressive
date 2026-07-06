import bcrypt from 'bcrypt';
import type { HashPasswordGateway } from '@/application/gateway/hash-password-gateway.js';

export class ByCryptGateway implements HashPasswordGateway {
	async hash(password: string): Promise<string> {
		return await bcrypt.hash(password, 12);
	}

	async compare(password: string, hashPassword: string): Promise<boolean> {
		return await bcrypt.compare(password, hashPassword);
	}
}
