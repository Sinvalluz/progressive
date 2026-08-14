export class EquipmentAlreadyExists extends Error {
	constructor(readonly message: string = 'O equipamento informado já existe. Tente outro equipamento.') {
		super(message);
	}
}
