import z from 'zod';
import 'dotenv/config';

const envSchema = z.object({
	DATABASE_URL: z.string(),
	DIRECT_URL: z.string(),
});

export const env = envSchema.parse(process.env);
