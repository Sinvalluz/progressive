import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { Spinner } from '@/components/ui/spinner';
import { paths } from '@/config/path';
import { useAuth } from '@/providers/auth-provider';
import getUser from '@/services/get-user';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { data, isLoading, isSuccess, isError } = useQuery({ queryKey: ['user'], queryFn: getUser, retry: false });
	const { setUser } = useAuth();
	const location = useLocation();

	useEffect(() => {
		if (isSuccess) {
			setUser(data);
		}
	}, [isSuccess, data, setUser]);

	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		return (
			<Navigate
				to={paths.auth.signIn.getHref(location.pathname)}
				replace
			/>
		);
	}

	return children;
}
