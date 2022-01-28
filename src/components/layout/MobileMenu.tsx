import styled from 'styled-components';
import { Link as ReactLink, useLocation } from 'react-router-dom';

export function MobileMenu() {
	const location = useLocation();
	const { pathname } = location;
	const splitLocation = pathname.split('/');

	console.log(splitLocation);

	return (
		<MobileMenuWrapper>
			<Navigation>
				<Link to="/swap" className={splitLocation[1] === 'swap' ? 'active' : ''}>
					<Icon src="/icons/swap.svg" alt="" />
					Swap
				</Link>
				<Link to="/earn" className={splitLocation[1] === 'earn' ? 'active' : ''}>
					<Icon src="/icons/earn.svg" alt="" />
					Earn
				</Link>
				<Link to="/trees" className={splitLocation[1] === 'trees' ? 'active' : ''}>
					<Icon src="/icons/trees.svg" alt="" />
					Trees
				</Link>
			</Navigation>
		</MobileMenuWrapper>
	);
}

const MobileMenuWrapper = styled.div`
	display: none;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 70px;
	background-color: var(--light-green);
	overflow: hidden;
	z-index: 9999;

	@media screen and (max-width: 768px) {
		display: block;
	}
`;

const Navigation = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
`;

const Link = styled(ReactLink)`
	position: relative;
	padding: 0px var(--space-2);
	line-height: 1rem;
	font-size: 0.8rem;
	text-decoration: none;
	text-align: center;
	color: var(--dark-green);
	transition: 0.3s all;

	&::after {
		content: '';
		position: absolute;
		bottom: -30px;
		left: 25%;
		right: 25%;
		height: 20px;
		border-radius: 5px;
		background-color: var(--dark-green);
		transition: 0.3s all;
	}

	&.active {
		transform: translateY(-2px);

		&::after {
			bottom: -28px;
		}
	}
`;

const Icon = styled.img`
	margin: 0 auto 3px auto;
	width: 32px;
	height: 32px;
`;
