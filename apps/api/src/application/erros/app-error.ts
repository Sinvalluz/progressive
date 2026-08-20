export default class AppError extends Error {
	constructor(
		readonly statusCode: number,
		message: string,
	) {
		super(message);
	}
}
