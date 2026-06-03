import { NextResponse } from 'next/server';
import z from 'zod';
import { createUser, registerRequestSchema } from '@/features/auth';

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const result = registerRequestSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json(
				{
					message: 'Erro de validação',
					errors: z.treeifyError(result.error),
				},
				{
					status: 400,
				},
			);
		}

		await createUser(result.data);

		return NextResponse.json(
			{
				message: 'Usuário criado com sucesso',
			},
			{
				status: 201,
			},
		);
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json(
				{ message: error.message },
				{
					status: 400,
				},
			);
		}
	}
}
