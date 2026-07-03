import type { User } from '../entity/user.js';

export interface UserGateway {
	findByEmail(email: string): Promise<User | null>;
	create(user: User): Promise<User>;
}
