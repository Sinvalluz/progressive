import z from 'zod';

export const MuscleGroupCreateDto = z.object({
	name: z.string('O nome precisa ser uma string').min(1, 'O nome é obrigatório'),
});

export const MuscleGroupResponseDto = z.object({
	id: z.string(),
	name: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const MuscleGroupUpdateDto = z.object({
	name: z.string('O nome precisa ser uma string').min(1, 'O nome é obrigatório'),
});
