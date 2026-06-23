import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/providers/theme-provider';
import { Button } from './ui/button';

interface ThemeButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {}

export function ModeToggle({ ...props }: ThemeButtonProps) {
	const { theme, setTheme } = useTheme();

	function toggleTheme() {
		setTheme(theme === 'light' ? 'dark' : 'light');
	}

	return (
		<Button
			size={'icon'}
			type='button'
			onClick={toggleTheme}
			className='cursor-pointer rounded-full border-0 text-primary relative bg-transparent hover:bg-transparent'
			{...props}
		>
			<Sun className='absolute size-6 lg:size-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0' />
			<Moon className='absolute size-6 lg:size-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100' />
		</Button>
	);
}
