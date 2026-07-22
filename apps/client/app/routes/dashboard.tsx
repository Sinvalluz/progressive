import { Button } from '@/components/ui/button';
import { paths } from '@/config/path';
import { useAuth } from '@/providers/auth-provider';
import logout from '@/services/logout';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export default function DashboardRoute() {
	const { user, setUser } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	return (
		<div>
			<h1>DashboardRoute</h1>
			<h2>{user?.name}</h2>
			<p>{user?.role}</p>
			<Button onClick={async () => {
				await logout()
				queryClient.clear();
				navigate(paths.auth.signIn.path)
				setUser(null)
			}}>Sair</Button>
		</div>
	);
}
