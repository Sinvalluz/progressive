export const paths = {
	home: {
		path: '/',
		getHref: () => '/',
	},
	auth: {
		signUp: {
			path: '/auth/signup',
			getHref: (redirectTo?: string | null | undefined) =>
				`/auth/signup${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
		},
		signIn: {
			path: '/auth/signin',
			getHref: (redirectTo?: string | null | undefined) =>
				`/auth/signin${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
		},
	},
	dashboard: {
		path: '/dashboard',
		getHref: () => '/dashboard',
	},
} as const;
