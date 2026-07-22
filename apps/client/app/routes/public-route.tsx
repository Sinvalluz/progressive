import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { Spinner } from '@/components/ui/spinner';
import { paths } from '@/config/path';
import { useAuth } from '@/providers/auth-provider';
import getUser from '@/services/get-user';

export default function PublicRoute({ children }: { children: React.ReactNode }) {
	const { data, isLoading, isSuccess } = useQuery({ queryKey: ['user'], queryFn: getUser, retry: false });
	const { setUser } = useAuth();
	const location = useLocation();
	const redirectTo = location.state?.redirectTo ?? paths.dashboard.getHref();

	useEffect(() => {
		if (isSuccess) {
			setUser(data);
		}
	}, [data, isSuccess, setUser]);

	if (isLoading) {
		return <Spinner />;
	}

	if (isSuccess) {
		return (
			<Navigate
				to={redirectTo}
				replace
			/>
		);
	}
	return children;
}
