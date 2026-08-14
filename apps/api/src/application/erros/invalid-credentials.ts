export class InvalidCredentialsError extends Error {
	constructor(readonly message: string = 'Credenciais inválidas, tente novamente') {
		super(message);
	}
}
