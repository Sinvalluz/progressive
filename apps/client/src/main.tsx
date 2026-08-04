import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/app/index';
import './index.css';

// biome-ignore lint/style/noNonNullAssertion: <Vite default config>
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
