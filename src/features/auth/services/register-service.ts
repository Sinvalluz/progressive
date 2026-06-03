import * as bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import type { RegisterRequestDto } from '../schemas/register-schema';

export async function createUser(registerRequestDto: RegisterRequestDto) {
	const existingUser = await prisma.user.findFirst({
		where: {
			email: registerRequestDto.email,
		},
	});

	if (existingUser) {
		throw new Error('Email já cadastrado');
	}

	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(registerRequestDto.password, salt);

	await prisma.user.create({
		data: {
			email: registerRequestDto.email,
			name: registerRequestDto.name,
			password: hashPassword,
			role: 'USER',
		},
	});
}
