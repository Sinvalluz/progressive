import AppError from './app-error.js';

export class MuscleGroupNotFound extends AppError {
	constructor() {
		super(404, 'O grupo muscular não foi encontrado');
	}
}
