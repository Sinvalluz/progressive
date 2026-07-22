export type UserResponse = {
	id: string;
	email: string;
	name: string;
	role: 'USER' | 'ADMIN';
	imgUrl: string | null;
	createdAt: Date;
	updatedAt: Date;
};
