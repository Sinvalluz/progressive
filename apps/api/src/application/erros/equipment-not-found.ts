import AppError from './app-error.js';

export class EquipmentNotFound extends AppError {
	constructor() {
		super(404, 'O equipamento não foi encontrado');
	}
}
