import { SectionHeader, TokenIcon } from '../GlobalStyle';
import {
	Balance,
	InputToken,
	InputTokenHeader,
	InputTokenSeparator,
	InputTokenSeparatorIcon,
	InputWrapper,
	PairSymbol,
	PriceInput,
	TokenSymbol,
} from '../ui/InputToken';
import styled from 'styled-components';
import { useTerraNativeBalances } from '../../hooks/useTerraNativeBalances';
import { useWithdrawLiquidity } from '../../hooks/useWithdrawLiquidity';

export function Withdraw() {
	const { uUST } = useTerraNativeBalances();
	const {} = useWithdrawLiquidity();

	return (
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
	);
}

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
