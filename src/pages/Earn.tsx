import { PageDescription, PageTitle, TokenIcon } from 'components/GlobalStyle';
import styled from 'styled-components';
import { useState } from 'react';
import { Provide } from 'components/earn/Provide';
import { Withdraw } from '../components/earn/Withdraw';

enum EarnSection {
	Provide,
	Withdraw,
}

export function Earn() {
	const [sectionToDisplay, setSectionToDisplay] = useState<EarnSection>(EarnSection.Provide);

	return (
		<article>
			<header>
				<PageTitle>Earn</PageTitle>
				<PageDescription>Stake your tokens to earn ORNE</PageDescription>
			</header>

			<Pool>
				<PoolColumn>
					<PoolIcons>
						<TokenIcon>
							<img src="/images/orne-logo.svg" />
						</TokenIcon>
						<TokenIcon>
							<img src="/icons/ust.svg" />
						</TokenIcon>
					</PoolIcons>
					<PoolSymbol>ORNE / UST</PoolSymbol>
				</PoolColumn>
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

			<div className="buttons-group mt-5">
				<button className="outline-dark" onClick={() => setSectionToDisplay(EarnSection.Provide)}>
					Provide
				</button>
				<button className="outline-dark" onClick={() => setSectionToDisplay(EarnSection.Withdraw)}>
					Withdraw
				</button>
			</div>

			{sectionToDisplay === EarnSection.Provide ? <Provide /> : <Withdraw />}
		</article>
	);
}

const Pool = styled.section`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--space-3);
	border-radius: var(--rounded);
	background-color: var(--light-green);

	@media screen and (max-width: 992px) {
		flex-wrap: wrap;
	}
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
	text-align: right;

	:last-of-type {
		margin-right: 0px;
	}

	label {
		font-size: 1rem;
	}

	@media screen and (max-width: 992px) {
		margin-right: 0px;
		width: 50%;

		:last-of-type {
			width: 100%;
		}

		:nth-child(3) {
			margin-left: auto;
			padding-right: var(--space-3);
		}

		:nth-child(4) {
			width: 35%;
		}
	}

	@media screen and (max-width: 768px) {
		:nth-child(4) {
			width: 50%;
		}
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

	@media screen and (max-width: 992px) {
		justify-content: flex-end;
	}
`;
