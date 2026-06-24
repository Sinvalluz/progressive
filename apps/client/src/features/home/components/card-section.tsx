import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CardSection() {
	return (
		<section className='flex flex-col md:flex-row gap-8'>
			<Card className='border border-border h-117 rounded-4xl bg-transparent'>
				<CardHeader className='flex-1 text-center flex items-center justify-center'>
					imagem de demonstração
				</CardHeader>
				<CardContent>
					<CardTitle className='text-foreground'>Lorem ipsum dolor sit amet.</CardTitle>
					<CardDescription className='text-secondary-foreground'>
						Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing
						elit quisque faucibus.
					</CardDescription>
				</CardContent>
			</Card>
			<Card className='border border-border h-117 rounded-4xl bg-transparent'>
				<CardHeader className='flex-1 text-center flex items-center justify-center'>
					imagem de demonstração
				</CardHeader>
				<CardContent>
					<CardTitle className='text-foreground'>Lorem ipsum dolor sit amet.</CardTitle>
					<CardDescription className='text-secondary-foreground'>
						Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing
						elit quisque faucibus.
					</CardDescription>
				</CardContent>
			</Card>
			<Card className='border border-border h-117 rounded-4xl bg-transparent'>
				<CardHeader className='flex-1 text-center flex items-center justify-center'>
					imagem de demonstração
				</CardHeader>
				<CardContent>
					<CardTitle className='text-foreground'>Lorem ipsum dolor sit amet.</CardTitle>
					<CardDescription className='text-secondary-foreground'>
						Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing
						elit quisque faucibus.
					</CardDescription>
				</CardContent>
			</Card>
		</section>
	);
}
