import { useAuth } from '@/providers/auth-provider';

export default function DashboardRoute() {
	const { user } = useAuth();
	return (
		<div>
			<h1>DashboardRoute</h1>
			<h2>{user?.name}</h2>
			<p>{user?.role}</p>
		</div>
	);
}
