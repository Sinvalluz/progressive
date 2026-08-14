export class UserNotFound extends Error {
	constructor(readonly message: string = 'O Usuário não foi encontrado') {
		super(message);
	}
}
