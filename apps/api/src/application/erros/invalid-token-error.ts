import { AppError } from './app-error.js';

export class InvalidTokenError extends AppError {
	constructor(readonly statusCode: number = 404) {
		super(statusCode, 'Token não encontrado, informe o token corretamente');
	}
}
