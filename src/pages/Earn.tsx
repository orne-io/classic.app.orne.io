import { PageDescription, PageTitle, TokenIcon } from 'components/GlobalStyle';
import styled from 'styled-components';

export function Earn() {
	return (
		<article>
			<header>
				<PageTitle>Swap</PageTitle>
				<PageDescription>Stake your tokens to earn ORNE</PageDescription>
			</header>

			<Pool>
				<PoolIcons>
					<TokenIcon>
						<img src="/images/orne-logo.svg" />
					</TokenIcon>
					<TokenIcon>
						<img src="/icons/ust.svg" />
					</TokenIcon>
				</PoolIcons>
				<PoolSymbol>ORNE / UST</PoolSymbol>
				<PoolColumn>
					<label>APR</label>
					<div>124,32%</div>
				</PoolColumn>
				<PoolColumn>
					<label>Liquidity</label>
					<div>12,3m UST</div>
				</PoolColumn>
				<PoolColumn>
					<label>Staked</label>
					<div>1337,420 LP</div>
				</PoolColumn>
				<PoolColumn>
					<label>Rewards</label>
					<RewardsWrapper>
						<span>10000,000 ORNE</span>
						<button className="btn-claim outline-dark">Claim</button>
					</RewardsWrapper>
				</PoolColumn>
			</Pool>
		</article>
	);
}

const Pool = styled.section`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--space-2) var(--space-3);
	border-radius: var(--rounded);
	background-color: var(--light-green);
`;

const PoolIcons = styled.div`
	display: flex;

	div:nth-child(2) {
		margin-left: -15px;
	}
`;

const PoolColumn = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: auto;

	:last-of-type {
		margin-right: 0px;
	}

	label {
		font-size: 1rem;
	}
`;

const PoolSymbol = styled.div`
	margin-right: auto;
	white-space: nowrap;
`;

const RewardsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;

	span {
		margin-right: var(--space-2);
		white-space: nowrap;
	}

	.btn-claim {
		padding-top: 0px;
		padding-bottom: 0px;
		font-size: 1rem;
	}
`;
