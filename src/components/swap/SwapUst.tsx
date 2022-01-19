import {
	Error,
	InformationCell,
	SwapButton,
	SwapSection,
	SwapBottom,
	TxDetails,
	FormControls,
	Separator,
} from './index';
import {
	InputToken,
	InputTokenHeader,
	InputTokenSeparator,
	InputTokenSeparatorIcon,
	InputTokenWrapper,
	InputWrapper,
	PriceInput,
	TokenSymbol,
} from 'components/ui/InputToken';
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

import { Balance } from 'components/wallet/ButtonStyle';

const regex = /^[0-9.]*$/;

export function SwapUst({ onChangeDirection }) {
	const [error, setError] = useState('');
	const [amount, setAmount] = useState<string | null>();
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
			<InputTokenWrapper>
				<InputToken>
					<InputTokenHeader>
						<label htmlFor="amount" style={{ marginRight: 'auto' }}>
							Balance
						</label>
						<Balance>{uUST || 0}</Balance>
						<button type="button" className="outline-dark">
							Max
						</button>
					</InputTokenHeader>
					<InputWrapper>
						<PriceInput
							id="amount"
							name="amount"
							type="text"
							placeholder="0.00"
							autoComplete="off"
							value={amount || ''}
							onChange={handleAmountChange}
						/>
						<TokenSymbol>
							<TokenIcon>
								<img src="/icons/ust.svg" alt="UST" />
							</TokenIcon>
							UST
						</TokenSymbol>
					</InputWrapper>
				</InputToken>

				<InputTokenSeparator>
					<InputTokenSeparatorIcon onClick={() => onChangeDirection()}>
						<img src="/icons/swapping.svg" alt="" />
					</InputTokenSeparatorIcon>
				</InputTokenSeparator>

				<InputToken>
					<InputTokenHeader>
						<label style={{ marginRight: 'auto' }}>Estimated</label>
					</InputTokenHeader>
					<InputWrapper>
						<PriceInput type="text" value={new Decimal(estimatedOrne).dividedBy(1_000_000).toString()} disabled />
						<TokenSymbol>
							<TokenIcon>
								<img src="/images/orne-logo.svg" alt="ORNE" />
							</TokenIcon>
							ORNE
						</TokenSymbol>
					</InputWrapper>
				</InputToken>
			</InputTokenWrapper>

			<SwapBottom>
				<TxDetails>
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
				</TxDetails>

				<Separator></Separator>

				<FormControls>
					<Slippage slippage={slippage} onSlippageChange={(s) => setSlippage(s)} />

					<SwapButton type="submit">Swap</SwapButton>

					{error && <Error>{error}</Error>}
				</FormControls>
			</SwapBottom>
		</SwapSection>
	);
}
