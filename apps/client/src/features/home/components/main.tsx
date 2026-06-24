import CardSection from './card-section';
import HeroSection from './hero-section';
import TextCarousel from './text-carousel';

export default function HomeMain() {
	return (
		<main className='px-4 lg:px-20 pt-44 lg:pt-52 space-y-16'>
			<HeroSection />
			<CardSection />
			<TextCarousel />
		</main>
	);
}
