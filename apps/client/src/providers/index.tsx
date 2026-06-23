import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { queryConfig } from '../lib/react-query';
import { ThemeProvider } from './theme-provider';

type AppProvidersProps = {
	children: React.ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: queryConfig,
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			{' '}
			<ThemeProvider
				defaultTheme='dark'
				storageKey='vite-ui-theme'
			>
				{children}{' '}
			</ThemeProvider>
		</QueryClientProvider>
	);
}
