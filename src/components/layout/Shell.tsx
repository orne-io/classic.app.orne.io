import { styled } from 'stitches.config';
import { MaxWidthWrapper } from 'components/common';
import { Grid } from 'components/ui';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';
import { Sidebar } from './Sidebar';
import type { ReactNode } from 'react';

const ShellWrapper = styled(Grid, {
	'gridTemplateAreas': "'header header' 'aside main' 'footer footer'",
	'gridTemplateColumns': '300px 1fr',
	'gridTemplateRows': 'max-content 1fr 50px',
	'height': '100vh',

	'> header': {
		gridArea: 'header',
	},

	'> aside': {
		gridAre: 'aside',
	},

	'main': {
		'gridColumnStart': 'aside',
		'gridColumnEnd': 'main',
		'padding': '$5 $3',

		'@media (min-width: 768px)': {
			gridArea: 'main',
		},
	},

	'> footer': {
		gridArea: 'footer',
	},
});

export function Shell({ children }: { children: ReactNode }) {
	return (
		<ShellWrapper>
			<Header />
			<Sidebar />
			<MobileMenu />

			<MaxWidthWrapper as="main">{children}</MaxWidthWrapper>

			<Footer />
		</ShellWrapper>
	);
}
