export interface HashRefreshTokenGateway {
	hash(refreshToken: string): string;
	compare(refreshToken: string, hashRefreshToken: string): boolean;
}
