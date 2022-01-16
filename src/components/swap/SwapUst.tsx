import {
	Error,
	Content,
	InformationCell,
	InputBlock,
	InputHeader,
	InputWrapper,
	MetaBlock,
	MiddlePart,
	PriceInput,
	SwapButton,
	SwapIcon,
	SwapSection,
	TokenSymbol,
} from './index';
import { TokenIcon } from '../GlobalStyle';
import Decimal from 'decimal.js';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Fee } from '@terra-money/terra.js';
import { useDebounce } from 'use-debounce';
import { useSwap } from 'hooks/useSwap';
import { useEstimateFee } from 'hooks/useEstimateFee';
import { useIsFirstRender } from 'hooks/useIsFirstRender';
import { Slippage } from 'components/tx/Slippage';
import { useTerraNativeBalances } from 'hooks/useTerraNativeBalances';
import { useSwapSimulation } from 'hooks/useSwapSimulation';

const regex = /^[0-9.]*$/;

export function SwapUst() {
	const [error, setError] = useState('');
	const [amount, setAmount] = useState<string>('');
	const [debouncedAmount] = useDebounce(amount, 200);
	const [slippage, setSlippage] = useState<number>(1);
	const [fee, setFee] = useState<Fee | null>();
	const [estimatedOrne, setEstimatedOrne] = useState<string>('0');

	const { swap } = useSwap();
	const { uUST } = useTerraNativeBalances();
	const isFirstRender = useIsFirstRender();

	const { estimate } = useEstimateFee();
	const { simulate } = useSwapSimulation();

	useEffect(() => {
		setError('');

		if (isFirstRender || !debouncedAmount) {
			return;
		}

		Promise.all([
			simulate({ amountUst: debouncedAmount }),
			estimate({ amountUst: debouncedAmount, slippage: slippage.toString() }),
		])
			.then(([simulation, fee]) => {
				setEstimatedOrne(simulation.return_amount);
				setFee(fee);
			})
			.catch((e) => {
				const errorCode = e.response.data?.code;

				if (!errorCode) {
					setError('Unknown error');
					return;
				}

				if (errorCode === 3) {
					setError('Please, increase your slippage');
				}
			});
	}, [debouncedAmount, slippage]);

	const pricePerOrne =
		amount && estimate ? new Decimal(amount).times(1_000_000).dividedBy(estimatedOrne).toFixed(6) : '0';
	const feePrice = fee?.amount?.get('uusd')?.amount.dividedBy(1_000_000).toFixed(6) || '0';

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (!amount) {
			return;
		}

		swap({ amountUst: amount, slippage: slippage.toString() });
	}
	function handleAmountChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.currentTarget.value;

		if (regex.test(value)) {
			setAmount(value);
		}
	}

	return (
		<SwapSection autoComplete="off" onSubmit={handleSubmit}>
			<Content>
				<InputBlock>
					<InputHeader>
						<div>Balance</div>
						<span className="balance">{uUST || 0}</span>
						<button className="outline-dark">Max</button>
					</InputHeader>
					<InputWrapper>
						<PriceInput
							id="amount"
							name="amount"
							type="text"
							placeholder="0"
							autoComplete="off"
							value={amount}
							onChange={handleAmountChange}
						/>
						<TokenSymbol>
							<TokenIcon>
								<img src="/icons/ust.svg" alt="Orne logo" />
							</TokenIcon>
							UST
						</TokenSymbol>
					</InputWrapper>
				</InputBlock>

				<MetaBlock>
					<table>
						<tbody>
							<tr>
								<td>Price per $ORNE</td>
								<InformationCell>{pricePerOrne} UST</InformationCell>
							</tr>
							{/*<tr>*/}
							{/*	<td>Price Impact</td>*/}
							{/*	<InformationCell>+0.30%</InformationCell>*/}
							{/*</tr>*/}
							{/*<tr>*/}
							{/*	<td>Minimum Received</td>*/}
							{/*	<InformationCell>50 $ORNE</InformationCell>*/}
							{/*</tr>*/}
							<tr>
								<td>Tx Fee</td>
								<InformationCell>{feePrice} UST</InformationCell>
							</tr>
						</tbody>
					</table>
				</MetaBlock>
			</Content>

			<MiddlePart>
				<SwapIcon src="/icons/swapping.svg" alt="" />
			</MiddlePart>

			<Content>
				<InputBlock>
					<InputHeader>
						<span>Estimated</span>
					</InputHeader>
					<InputWrapper>
						<PriceInput type="text" value={new Decimal(estimatedOrne).dividedBy(1_000_000).toString()} disabled />
						<TokenSymbol>
							<TokenIcon>
								<img src="/images/orne-logo.svg" alt="Orne logo" />
							</TokenIcon>
							ORNE
						</TokenSymbol>
					</InputWrapper>
				</InputBlock>

				<MetaBlock style={{ gridColumn: 3 }}>
					<Slippage slippage={slippage} onSlippageChange={(s) => setSlippage(s)} />

					<SwapButton type="submit">Swap</SwapButton>

					{error && <Error>{error}</Error>}
				</MetaBlock>
			</Content>
		</SwapSection>
	);
}
