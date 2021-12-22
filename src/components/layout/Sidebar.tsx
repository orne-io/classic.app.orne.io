import styled from 'styled-components';
import { Link as ReactLink } from 'react-router-dom';

export function Sidebar() {
	return (
		<SidebarWrapper>
			<Navigation>
				<Link to="">
					<Icon src="/icons/swap.svg" alt="" />
					Swap
				</Link>
				<Link to="">
					<Icon src="/icons/earn.svg" alt="" />
					Earn
				</Link>
				<Link to="">
					<Icon src="/icons/trees.svg" alt="" />
					Trees
				</Link>
			</Navigation>
		</SidebarWrapper>
	);
}

const SidebarWrapper = styled.aside`
	margin-top: var(--space-4);
	padding-inline: var(--space-4);
`;

const Link = styled(ReactLink)`
	align-items: center;
	display: inline-flex;
	color: inherit;
	font-size: 23px;
	gap: var(--space-2);
	text-decoration: none;

	&:focus,
	&:hover {
		text-decoration: revert;
	}
`;

const Navigation = styled.nav`
	display: flex;
	flex-direction: column;
	gap: var(--space-4);
`;

const Icon = styled.img`
	height: 50px;
`;
