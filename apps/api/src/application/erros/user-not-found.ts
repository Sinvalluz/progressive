import AppError from './app-error.js';

export class UserNotFound extends AppError {
	constructor() {
		super(404, 'O Usuário não foi encontrado');
	}
}
