import type { User } from './user.js';

export interface UserRepository {
	findByEmail(email: string): Promise<User | null>;
	create(user: User): Promise<User>;
}
