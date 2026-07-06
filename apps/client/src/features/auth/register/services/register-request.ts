import { api } from '@/lib/api-client';
import type { RegisterFormData } from '../types/register-request-type';
import type { RegisterResponseData } from '../types/register-response-type';

export async function registerRequest(data: RegisterFormData) {
	return await api.post<RegisterResponseData>('/auth/register', data);
}
