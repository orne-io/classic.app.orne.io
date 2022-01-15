import Decimal from 'decimal.js';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { PageDescription, PageTitle, TokenIcon } from 'components/GlobalStyle';
import { useTerraNativeBalances } from 'hooks/useTerraNativeBalances';
import type { ChangeEvent, FormEvent } from 'react';
import { useApp } from '../hooks/useApp';
import { Coin, Fee, MsgExecuteContract } from '@terra-money/terra.js';
import { computeSwapUstToOrneMessage } from '../hooks/useSwap';
import { useEstimateFee } from '../hooks/useEstimateFee';
import { Slippage } from '../components/tx/Slippage';
import { useIsFirstRender } from '../hooks/useIsFirstRender';
import { useDebounce } from 'use-debounce';

const regex = /^[0-9.]*$/;

export function Swap() {
	const connectedWallet = useConnectedWallet();
	const { contractAddress } = useApp();
	const lcd = useLCDClient();
	const { uUST } = useTerraNativeBalances();
	const estimateFee = useEstimateFee();

	const [error, setError] = useState('');
	const [amount, setAmount] = useState<string>('');
	const [debouncedAmount] = useDebounce(amount, 1000);
	const [slippage, setSlippage] = useState<number>(1);
	const [estimate, setEstimate] = useState<string>('0');
	const [fee, setFee] = useState<Fee | null>();

	function handleAmountChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.currentTarget.value;

		if (regex.test(value)) {
			setAmount(value);
		}
	}

	const isFirstRender = useIsFirstRender();
	useEffect(() => {
		if (isFirstRender) {
			return;
		}

		setError('');
		setEstimate('0');
		setFee(null);

		if (!debouncedAmount) {
			return;
		}

		const formattedAmount = new Decimal(debouncedAmount).times(1_000_000).toString();

		const simulationQuery = {
			simulation: {
				offer_asset: {
					amount: formattedAmount,
					info: { native_token: { denom: 'uusd' } },
				},
			},
		};

		const swapMessage = computeSwapUstToOrneMessage(debouncedAmount, slippage.toString());

		Promise.all([
			lcd.wasm.contractQuery(contractAddress.pair, simulationQuery),
			estimateFee([
				new MsgExecuteContract(connectedWallet!.walletAddress, contractAddress.pair, swapMessage, [
					new Coin('uusd', formattedAmount),
				]),
			]),
		])
			.then(([simulation, fee]) => {
				setEstimate(simulation.return_amount);
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

	function swap(e: FormEvent) {
		e.preventDefault();

		if (!amount) {
			return;
		}

		const swapMessage = computeSwapUstToOrneMessage(amount, slippage.toString());

		const msg = new MsgExecuteContract(connectedWallet!.walletAddress, contractAddress.pair, swapMessage, [
			new Coin('uusd', new Decimal(amount).times(1_000_000)),
		]);

		void connectedWallet!.post({
			gasAdjustment: '1.6',
			gasPrices: '0.456uusd',
			feeDenoms: ['uusd'],
			msgs: [msg],
		});
	}

	const pricePerOrne = amount && estimate ? new Decimal(amount).times(1_000_000).dividedBy(estimate).toFixed(6) : '0';
	const feePrice = fee?.amount?.get('uusd')?.amount.dividedBy(1_000_000).toFixed(6) || '0';

	return (
		<article>
			<header>
				<PageTitle>Swap</PageTitle>
				<PageDescription>Instantly trade $ORNE and UST</PageDescription>
			</header>
			<SwapSection autoComplete="off" onSubmit={swap}>
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
							<PriceInput type="text" value={new Decimal(estimate).dividedBy(1_000_000).toString()} disabled />
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
		</article>
	);
}

const Error = styled.span`
	color: red;
	font-size: 1rem;
`;

const SwapSection = styled.form`
	display: grid;
	grid-template-columns: 1fr 70px 1fr;
	grid-template-rows: repeat(2, min-content);
	gap: var(--space-4);
`;

const Content = styled.section`
	display: contents;
`;

const InformationCell = styled.td`
	text-align: right;
`;

const InputBlock = styled.div`
	background-color: var(--light-green);
	border-radius: var(--rounded);
	padding: var(--space-2) var(--space-3);
	grid-row: 1;
`;

const MetaBlock = styled.div`
	grid-row: 2;

	> table {
		width: 100%;
	}
`;

const InputWrapper = styled.div`
	display: flex;
	align-items: center;
`;

const PriceInput = styled.input`
	padding: 0px var(--space-2) 0px 0px;
	width: 100%;
	height: 35px;
	font-size: 2rem;
	color: var(--dark-green);
	border: 0;
	background-color: transparent;

	:focus {
		outline: none;
	}
`;

const TokenSymbol = styled.div`
	display: flex;
`;

const InputHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: var(--space-2);

	.balance {
		margin-left: auto;
		margin-right: var(--space-3);
	}

	button {
		display: inline-block;
		line-height: 1.3rem;
		font-size: 1.2rem;
	}
`;

const MiddlePart = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
	grid-row: 1;
	grid-column: 2;
`;

const SwapIcon = styled.img`
	height: 45px;
	cursor: pointer;
	transition: 0.2s transform;

	:active {
		transform: scale(0.9);
	}
`;

const SwapButton = styled.button`
	display-inline: block;
	margin-top: var(--space-4);
	width: 100%;
	font-size: 2rem;
	color: white;
	border-radius: var(--rounded);
	background-color: var(--darker-green);
`;
