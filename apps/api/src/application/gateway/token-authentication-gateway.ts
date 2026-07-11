interface TokenPayload {
	id: string;
	email: string;
	name: string;
}
export interface TokenAuthenticationGateway {
	sign(payload: TokenPayload, options?: { expiresIn: string | number }): string;
	verify(token: string): TokenPayload;
}
