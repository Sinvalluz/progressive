import z from 'zod';
import 'dotenv/config';

export const EnvSchema = z.object({
	DATABASE_URL: z.string(),
	JWT_ACCESS_SECRET: z.string(),
	JWT_REFRESH_SECRET: z.string(),
	COOKIE_SECRET: z.string(),
});

export const env = EnvSchema.parse(process.env);
