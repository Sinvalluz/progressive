import { useAuth } from '@/providers/auth-provider';

export default function ProfileRoute() {
	const { user } = useAuth();
	return (
		<div>
			<h1>Profile Route</h1>
			<p>{user?.name}</p>
		</div>
	);
}
