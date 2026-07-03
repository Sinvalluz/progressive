import { AppError } from './app-error.js';

export class EmailIsAlreadyInUse extends AppError {
	constructor(readonly statusCode: number = 409) {
		super(statusCode, 'O e-mail informado já está em uso. Tente outro e-mail.');
	}
}
