import AppError from './app-error.js';

export class EmailIsAlreadyInUse extends AppError {
	constructor() {
		super(409, 'O e-mail informado já está em uso. Tente outro e-mail.');
	}
}
