import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
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
			<SidebarProvider defaultOpen={false}>
				<ThemeProvider
					defaultTheme='dark'
					storageKey='vite-ui-theme'
				>
					{children}
				</ThemeProvider>
			</SidebarProvider>
		</QueryClientProvider>
	);
}
