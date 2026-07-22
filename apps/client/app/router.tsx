import { type QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter, Outlet } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { paths } from '../src/config/path';
import ProtectedRoute from './routes/protected-route';
import PublicRoute from './routes/public-route';

// biome-ignore lint/suspicious/noExplicitAny: <Config default bulletproof architecture>
const convert = (queryClient: QueryClient) => (m: any) => {
	const { clientLoader, clientAction, default: Component, ...rest } = m;
	return {
		...rest,
		loader: clientLoader?.(queryClient),
		action: clientAction?.(queryClient),
		Component,
	};
};

export const createAppRouter = (queryClient: QueryClient) =>
	createBrowserRouter([
		{
			element: (
				<PublicRoute>
					<Outlet />
				</PublicRoute>
			),
			HydrateFallback: () => {},
			children: [
				{
					path: paths.home.path,
					lazy: () => import('./routes/home').then(convert(queryClient)),
					HydrateFallback: () => {},
				},
				{
					path: paths.auth.signUp.path,
					lazy: () => import('./routes/auth/register').then(convert(queryClient)),
					HydrateFallback: () => {},
				},
				{
					path: paths.auth.signIn.path,
					lazy: () => import('./routes/auth/login').then(convert(queryClient)),
					HydrateFallback: () => {},
				},
			],
		},

		{
			path: '*',
			lazy: () => import('./routes/not-found').then(convert(queryClient)),
			HydrateFallback: () => {},
		},
		{
			element: (
				<ProtectedRoute>
					<Outlet />
				</ProtectedRoute>
			),
			HydrateFallback: () => {},
			children: [
				{
					path: paths.dashboard.path,
					lazy: () => import('./routes/dashboard').then(convert(queryClient)),
				},
			],
		},
	]);

export const AppRouter = () => {
	const queryClient = useQueryClient();

	const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

	return <RouterProvider router={router} />;
};
