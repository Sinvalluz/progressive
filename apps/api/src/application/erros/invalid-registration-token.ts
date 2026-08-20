import AppError from './app-error.js';

export class InvalidRegistrationToken extends AppError {
	constructor() {
		super(401, 'O token de registro está inválido, tente novamente com o token correto');
	}
}
