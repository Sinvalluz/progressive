import AppError from './app-error.js';

export class EquipmentAlreadyExists extends AppError {
	constructor() {
		super(409, 'O equipamento informado já existe. Tente outro equipamento.');
	}
}
