import { AppError } from './app-error.js';

export class InvalidCredentialsError extends AppError {
	constructor(readonly statusCode: number = 409) {
		super(statusCode, 'Credenciais inválidas, tente novamente');
	}
}
