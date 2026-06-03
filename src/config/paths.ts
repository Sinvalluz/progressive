export const paths = {
	signUp: {
		path: '/signup',
		getHref: (redirectTo?: string | null | undefined) =>
			`/signup${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
	},
};
