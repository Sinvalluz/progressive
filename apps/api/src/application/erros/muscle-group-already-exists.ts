import AppError from './app-error.js';

export class MuscleGroupAlreadyExists extends AppError {
	constructor() {
		super(409, 'O grupo muscular informado já existe. Tente outro grupo muscular.');
	}
}
