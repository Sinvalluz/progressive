interface TokenPayload {
	id: string;
	email: string;
	name: string;
}
export interface TokenAuthenticationGateway {
	sign(payload: TokenPayload): string;
	verify(token: string): TokenPayload;
}
