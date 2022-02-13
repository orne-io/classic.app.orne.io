import { styled } from 'stitches.config';
import { MobileLink } from 'components/layout/navigation';
import { Flex } from 'components/ui';

const MobileMenuWrapper = styled('div', {
	'display': 'block',
	'backgroundColor': '$lightGreen',
	'position': 'fixed',
	'bottom': 0,
	'left': 0,
	'right': 0,
	'height': '70px',
	'overflow': 'hidden',
	'zIndex': 9999,

	'@media (min-width: 768px)': {
		display: 'none',
	},
});

const Icon = styled('img', {
	margin: '0 auto 3px auto',
	height: '32px',
	width: '32px',
});

export function MobileMenu() {
	return (
		<MobileMenuWrapper>
			<Flex align="center" justify="center" css={{ height: '100%' }}>
				<MobileLink to="/swap">
					<Icon src="/icons/swap.svg" alt="" />
					Swap
				</MobileLink>
				<MobileLink to="/earn">
					<Icon src="/icons/earn.svg" alt="" />
					Earn
				</MobileLink>
				<MobileLink to="/trees">
					<Icon src="/icons/trees.svg" alt="" />
					Trees
				</MobileLink>
			</Flex>
		</MobileMenuWrapper>
	);
}
