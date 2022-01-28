import { Header } from './Header';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';
import { MaxWidthWrapper } from '../common/MaxWidthWrapper';
import { Sidebar } from './Sidebar';
import type { ReactNode } from 'react';
import styled from 'styled-components';

export function Shell({ children }: { children: ReactNode }) {
	return (
		<ShellWrapper>
			<Header />
			<Sidebar />
			<MobileMenu />

			<Main as="main">{children}</Main>

			<Footer />
		</ShellWrapper>
	);
}

const Main = styled(MaxWidthWrapper)`
	grid-area: main;
	width: 100%;

	@media screen and (max-width: 768px) {
		grid-column-start: aside;
		grid-column-end: main;
		padding: var(--space-5) var(--space-3);
	}
`;

const ShellWrapper = styled.div`
	display: grid;
	grid-template-areas: 'header header' 'aside main' 'footer footer';
	grid-template-columns: 300px 1fr;
	grid-template-rows: max-content 1fr 50px;
	height: 100vh;

	> header {
		grid-area: header;
	}

	> aside {
		grid-area: aside;
	}

	> footer {
		grid-area: footer;
	}
`;
