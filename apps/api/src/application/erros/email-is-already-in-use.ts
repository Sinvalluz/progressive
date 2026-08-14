export class EmailIsAlreadyInUse extends Error {
	constructor(readonly message: string = 'O e-mail informado já está em uso. Tente outro e-mail.') {
		super(message);
	}
}
