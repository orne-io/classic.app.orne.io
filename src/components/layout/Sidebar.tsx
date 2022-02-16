import { styled } from 'stitches.config';
import { Link } from './navigation';
import { Flex } from '../ui';

const SidebarWrapper = styled('aside', {
	'display': 'none',
	'marginTop': '$4',
	'paddingInline': '$4',

	'@media (min-width: 768px)': {
		display: 'block',
	},
});

const Icon = styled('img', {
	height: '50px',
});

export function Sidebar() {
	return (
		<SidebarWrapper>
			<Flex direction="column" gap={4}>
				<Link to="/swap">
					<Icon src="/icons/swap.svg" alt="" />
					Swap
				</Link>
				<Link to="/earn">
					<Icon src="/icons/earn.svg" alt="" />
					Earn
				</Link>
				<Link to="/trees">
					<Icon src="/icons/trees.svg" alt="" />
					Trees
				</Link>
			</Flex>
		</SidebarWrapper>
	);
}
