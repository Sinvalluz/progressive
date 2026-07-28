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
	routines: {
		path: '/routines',
		getHref: () => '/routines',
	},
	exercises: {
		path: '/exercises',
		getHref: () => '/exercises',
	},
	profile: {
		path: '/profile',
		getHref: () => '/profile',
	},
} as const;
