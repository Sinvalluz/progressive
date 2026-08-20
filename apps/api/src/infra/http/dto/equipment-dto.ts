import z from 'zod';

export const EquipmentCreateDto = z.object({
	name: z.string('O nome precisa ser uma string').min(1, 'O nome é obrigatório'),
});

export const EquipmentResponseDto = z.object({
	id: z.string(),
	name: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const EquipmentUpdateDto = z.object({
	name: z.string('O nome precisa ser uma string').min(1, 'O nome é obrigatório'),
});
