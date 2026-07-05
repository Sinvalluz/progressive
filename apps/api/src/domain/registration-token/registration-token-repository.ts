import type { RegistrationToken } from './registration-token.js';

export interface RegistrationTokenRepository {
	find(token: string): Promise<RegistrationToken | null>;
}
