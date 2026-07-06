export interface TokenAuthenticationGateway<TokenPayload> {
	sign(payload: TokenPayload): string;
	verify(token: string): TokenPayload;
}
