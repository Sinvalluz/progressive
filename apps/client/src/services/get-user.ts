import { api } from '@/lib/api-client';
import type { UserResponse } from '@/types/user/user-response';

export default async function getUser() {
	const response = await api.get<UserResponse>('/me');

	return response.data;
}
