import { AppError } from './app-error.js';

export class UserNotFound extends AppError {
	constructor(readonly statusCode: number = 404) {
		super(statusCode, 'O Usuário não foi encontrado');
	}
}
