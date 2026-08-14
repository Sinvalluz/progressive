export class InvalidRegistrationToken extends Error {
	constructor(readonly message: string = 'O token de registro está inválido, tente novamente com o token correto') {
		super(message);
	}
}
