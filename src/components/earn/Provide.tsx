import { useProvideLiquidity } from 'hooks/useProvideLiquidity';
import { SectionHeader, TokenIcon } from '../GlobalStyle';
import {
	Balance,
	InputToken,
	InputTokenHeader,
	InputTokenSeparator,
	InputTokenSeparatorIcon,
	InputTokenWrapper,
	InputWrapper,
	PriceInput,
	TokenSymbol,
} from '../ui/InputToken';
import styled from 'styled-components';
import { useTerraNativeBalances } from '../../hooks/useTerraNativeBalances';
import { ChangeEvent, useState } from 'react';

const regex = /^[0-9.]*$/;

export function Provide() {
	const { uUST } = useTerraNativeBalances();
	const { provide } = useProvideLiquidity();

	const [amountOrne, setAmountOrne] = useState<string | null>('');
	const [amountUst, setAmountUst] = useState<string | null>('');

	function handleSubmit(e) {
		e.preventDefault();
		console.log({ amountUst, amountOrne });

		if (!amountOrne || !amountUst) return;

		provide({ amountUst, amountOrne });
	}

	function handleAmountUstChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.currentTarget.value;

		if (regex.test(value)) {
			setAmountUst(value);
		}
	}

	function handleAmountOrneChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.currentTarget.value;

		if (regex.test(value)) {
			setAmountOrne(value);
		}
	}

	return (
		<StakeSection onSubmit={handleSubmit}>
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
						<PriceInput id="orne-input" type="text" placeholder="0,0" onChange={handleAmountOrneChange} />
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
						<PriceInput id="ust-input" type="text" placeholder="0,0" onChange={handleAmountUstChange} />
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
				<Separator />
				<FormControls>
					<button type="submit">Stake Tokens</button>
					<button className="outline">Cancel</button>
				</FormControls>
			</StakeBottom>
		</StakeSection>
	);
}

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
