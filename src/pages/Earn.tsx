import { PageDescription, PageTitle, SectionHeader, TokenIcon } from 'components/GlobalStyle';
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
	PairSymbol,
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
				<SectionHeader>
					Stake ORNE and UST <button className="outline-dark small">Max</button>
				</SectionHeader>
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

			<WithdrawSection>
				<SectionHeader>
					Withdraw ORNE / UST Liquidity <button className="outline-dark small">Max</button>
				</SectionHeader>

				<PairTokenWrapper>
					<InputToken>
						<InputTokenHeader>
							<label htmlFor="lp-input">Balance</label>
							<Balance>420,20</Balance>
						</InputTokenHeader>
						<InputWrapper>
							<PriceInput id="lp-input" type="text" placeholder="0,0" />
							<PairSymbol>
								<TokenIcon>
									<img src="/images/orne-logo.svg" alt="Orne logo" />
								</TokenIcon>
								<TokenIcon>
									<img src="/icons/ust.svg" alt="UST logo" />
								</TokenIcon>
								ORNE/UST
							</PairSymbol>
						</InputWrapper>
					</InputToken>
					<InputTokenSeparator>
						<InputTokenSeparatorIcon>
							<img src="/icons/swapping.svg" alt="" />
						</InputTokenSeparatorIcon>
					</InputTokenSeparator>
					<PairTokenDistribution>
						<PairTokenValue>
							1548,148
							<TokenSymbol>
								<TokenIcon>
									<img src="/images/orne-logo.svg" alt="UST logo" />
								</TokenIcon>
								ORNE
							</TokenSymbol>
						</PairTokenValue>

						<InputTokenSeparatorIcon>
							<img src="/icons/plus.svg" alt="" />
						</InputTokenSeparatorIcon>

						<PairTokenValue>
							7465.654
							<TokenSymbol>
								<TokenIcon>
									<img src="/icons/ust.svg" alt="UST logo" />
								</TokenIcon>
								UST
							</TokenSymbol>
						</PairTokenValue>
					</PairTokenDistribution>
				</PairTokenWrapper>
			</WithdrawSection>
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

const WithdrawSection = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const PairTokenWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: var(--space-3);
	width: 100%;

	${InputTokenSeparator} {
		margin-top: var(--space-3);
		margin-bottom: var(--space-3);
	}
`;

const PairTokenDistribution = styled(InputToken)`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: var(--space-3);

	${InputTokenSeparatorIcon} {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}
`;

const PairTokenValue = styled.div`
	display: flex;
	align-items: center;

	${TokenSymbol} {
		margin-left: var(--space-3);
	}
`;
