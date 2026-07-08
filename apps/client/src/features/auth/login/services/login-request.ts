import { api } from '@/lib/api-client';
import type { LoginFormData } from '../types/login-request-type';
import type { LoginResponseData } from '../types/login-response-type';

export async function LoginRequest(data: LoginFormData) {
	return await api.post<LoginResponseData>('/auth/login', data);
}
