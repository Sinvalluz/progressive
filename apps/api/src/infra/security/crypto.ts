import { createHash, timingSafeEqual } from 'node:crypto';
import type { HashRefreshTokenGateway } from '@/application/gateway/hash-refresh-token-gateway.js';

export class CryptoGateway implements HashRefreshTokenGateway {
	hash(refreshToken: string): string {
		return createHash('sha256').update(refreshToken).digest('hex');
	}

	compare(refreshToken: string, hashRefreshToken: string): boolean {
		const hash = this.hash(refreshToken);

		return timingSafeEqual(Buffer.from(hash), Buffer.from(hashRefreshToken));
	}
}
