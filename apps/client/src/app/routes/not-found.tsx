import { Link } from 'react-router';
import { paths } from '@/config/path';

export default function NotFoundRoute() {
	return (
		<div>
			<h1>404 - Not Found</h1>
			<Link
				to={paths.home.getHref()}
				replace
			>
				Go to Home
			</Link>
		</div>
	);
}
