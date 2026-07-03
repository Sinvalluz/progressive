export interface HashPasswordGateway {
	hash(password: string): Promise<string>;
}
