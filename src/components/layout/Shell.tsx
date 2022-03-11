import { ToastBar, Toaster } from 'react-hot-toast';
import { keyframes, styled } from 'stitches.config';
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
		gridArea: 'aside',
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

const slideIn = keyframes({
	'0%': { transform: 'translateX(100%)', opacity: 0 },
	'100%': { transform: 'translateX()', opacity: 1 },
});

const slideOut = keyframes({
	'0%': { transform: 'translateX(0%)', opacity: 1 },
	'100%': { transform: 'translateX(100%)', opacity: 0 },
});

export function Shell({ children }: { children: ReactNode }) {
	return (
		<ShellWrapper>
			<Header />
			<Sidebar />
			<MobileMenu />

			<MaxWidthWrapper as="main">{children}</MaxWidthWrapper>

			<Footer />

			<Toaster
				toastOptions={{
					className: '',
					style: {
						backgroundColor: 'hsl(168,26%,93%)',
						borderRadius: '5px',
						boxShadow: '$base',
						padding: '8px 16px',
					},
				}}
				containerStyle={{
					right: 50,
					top: 100,
				}}
				position="top-right"
				reverseOrder={false}
			>
				{(t) => (
					<ToastBar
						toast={t}
						style={{
							...t.style,
							animation: t.visible ? `${slideIn} 300ms ease-out forwards` : `${slideOut} 200ms ease-in forwards`,
						}}
					/>
				)}
			</Toaster>
		</ShellWrapper>
	);
}
