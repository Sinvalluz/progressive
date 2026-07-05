import { AppError } from './app-error.js';

export class InvalidRegistrationToken extends AppError {
	constructor(readonly statusCode: number = 401) {
		super(statusCode, 'O token de registro está inválido, tente novamente com o token correto');
	}
}
