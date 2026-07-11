import type { RefreshToken } from './refresh-token.js';

export interface RefreshTokenRepository {
	create(refreshToken: RefreshToken): Promise<RefreshToken>;
}
