import AppError from './app-error.js';

export class InvalidCredentialsError extends AppError {
	constructor() {
		super(409, 'Credenciais inválidas, tente novamente');
	}
}
