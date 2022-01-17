import { PageDescription, PageTitle, TokenIcon } from 'components/GlobalStyle';
import {
	InputTokenWrapper,
	InputToken,
	InputTokenHeader,
	Balance,
	InputTokenSeparator,
	InputTokenSeparatorIcon,
	InputWrapper,
	PriceInput,
	TokenSymbol,
} from 'components/ui/InputToken';
import { useTerraNativeBalances } from 'hooks/useTerraNativeBalances';
import styled from 'styled-components';
import Decimal from 'decimal.js';

export function Earn() {
	const { uUST } = useTerraNativeBalances();

	return (
		<article>
			<header>
				<PageTitle>Earn</PageTitle>
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

			<div className="buttons-group mt-5">
				<button className="outline-dark">Stake</button>
				<button className="outline-dark">Withdraw</button>
			</div>

			<StakeSection>
				<StakeSectionHeader>
					Stake ORNE and UST <button className="outline-dark small">Max</button>
				</StakeSectionHeader>
				<InputTokenWrapper>
					<InputToken>
						<InputTokenHeader>
							<label htmlFor="orne-input">Balance</label>
							<Balance>420,20</Balance>
						</InputTokenHeader>
						<InputWrapper>
							<PriceInput id="orne-input" type="text" placeholder="0,0" />
							<TokenSymbol>
								<TokenIcon>
									<img src="/images/orne-logo.svg" alt="Orne logo" />
								</TokenIcon>
								ORNE
							</TokenSymbol>
						</InputWrapper>
					</InputToken>
					<InputTokenSeparator>
						<InputTokenSeparatorIcon>
							<img src="/icons/plus.svg" alt="" />
						</InputTokenSeparatorIcon>
					</InputTokenSeparator>
					<InputToken>
						<InputTokenHeader>
							<label htmlFor="ust-input">Balance</label>
							<Balance>{(uUST / 1_000_000).toFixed(2)}</Balance>
						</InputTokenHeader>
						<InputWrapper>
							<PriceInput id="ust-input" type="text" placeholder="0,0" />
							<TokenSymbol>
								<TokenIcon>
									<img src="/icons/ust.svg" alt="UST logo" />
								</TokenIcon>
								UST
							</TokenSymbol>
						</InputWrapper>
					</InputToken>
				</InputTokenWrapper>
				<StakeBottom>
					<TxDetails>
						<table>
							<tr>
								<td>Orne Price</td>
								<td>0.032342 UST</td>
							</tr>
							<tr>
								<td>LP from TX</td>
								<td>0,0 LP</td>
							</tr>
							<tr>
								<td>Pool Share after TX</td>
								<td>0,01%</td>
							</tr>
						</table>
					</TxDetails>
					<Separator></Separator>
					<FormControls>
						<button>Stake Tokens</button>
						<button className="outline">Cancel</button>
					</FormControls>
				</StakeBottom>
			</StakeSection>
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
	text-align: right;

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

const StakeSection = styled.form`
	display: flex;
	flex-wrap: wrap;
`;

const StakeSectionHeader = styled.div`
	display: flex;
	align-items: center;
	margin-top: var(--space-5);
	width: 100%;

	button {
		margin-left: var(--space-2);
	}
`;

const StakeBottom = styled.div`
	display: flex;
	width: 100%;
`;

const Separator = styled.div`
	width: 25%;
`;

const TxDetails = styled.div`
	padding: 0px var(--space-3);
	width: 100%;

	table {
		width: 100%;

		tr {
			td {
				&:last-of-type {
					text-align: right;
				}
			}
		}
	}
`;

const FormControls = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-end;
	padding: 0px var(--space-3);
	width: 100%;

	button:last-child {
		margin-left: var(--space-2);
	}
`;
