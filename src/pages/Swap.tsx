import { useState } from 'react';
import styled from 'styled-components';
import { useOrneBalance } from '../hooks/useOrneBalance';
import type { ChangeEvent, FormEvent } from 'react';

const regex = /^[0-9.]*$/;

export function Swap() {
	const { data } = useOrneBalance();

	const [amount, setAmount] = useState<string>('');
	const [slippage, setSlippage] = useState<number>(1);
	const [customSlippage, setCustomSlippage] = useState<string>('');

	function handleAmountChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.currentTarget.value;

		if (regex.test(value)) {
			setAmount(value);
		}
	}

	function handleCustomSlippageChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.currentTarget.value;

		if (regex.test(value)) {
			setCustomSlippage(value);
		}
	}

	function swap(e: FormEvent) {
		e.preventDefault();

		if (!amount) {
			return;
		}
	}

	return (
		<article>
			<header>
				<PageTitle>Swap</PageTitle>
				<PageDescription>Instantly trade $ORNE and UST</PageDescription>
			</header>
			<SwapSection autoComplete="off" onSubmit={swap}>
				<Content>
					<InputBlock>
						<BalanceControl>
							<div>Balance</div>
							<span className="balance">{data?.balance || 0}</span>
							<button>Max</button>
						</BalanceControl>
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
									<InformationCell>0.03 UST</InformationCell>
								</tr>
								<tr>
									<td>Price Impact</td>
									<InformationCell>+0.30%</InformationCell>
								</tr>
								<tr>
									<td>Minimum Received</td>
									<InformationCell>50 $ORNE</InformationCell>
								</tr>
								<tr>
									<td>Tx Fee</td>
									<InformationCell>0.25151 UST</InformationCell>
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
						<div>
							<span>Estimated</span>
						</div>
						<InputWrapper>
							<PriceInput type="text" value="0" disabled />
							<TokenSymbol>
								<TokenIcon>
									<img src="/images/orne-logo.svg" alt="Orne logo" />
								</TokenIcon>
								ORNE
							</TokenSymbol>
						</InputWrapper>
					</InputBlock>

					<MetaBlock style={{ gridColumn: 3 }}>
						<SlippageControl>
							<label htmlFor="slippage">Slippage</label>

							<SlippageSelector>
								<button onClick={() => setSlippage(0.5)}>0.5%</button>
								<button onClick={() => setSlippage(1)}>1%</button>
								<button onClick={() => setSlippage(4)}>4%</button>
								<input
									id="slippage"
									name="slippage"
									type="text"
									autoComplete="off"
									value={customSlippage}
									onChange={handleCustomSlippageChange}
								/>
							</SlippageSelector>
						</SlippageControl>

						<SwapButton type="submit">Swap</SwapButton>
					</MetaBlock>
				</Content>
			</SwapSection>
		</article>
	);
}

const PageTitle = styled.h1`
	border-left: 5px solid var(--text-color);
	font-size: 2rem;
	padding-left: var(--space-3);
`;

const PageDescription = styled.p`
	margin-top: var(--space-3);
`;

const SwapSection = styled.form`
	display: grid;
	grid-template-columns: 1fr 70px 1fr;
	grid-template-rows: repeat(2, min-content);
	gap: var(--space-4);
	margin-top: var(--space-6);
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

const TokenIcon = styled.div`
	margin-right: var(--space-2);
	padding: 8px;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background: white;
`;

const BalanceControl = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	.balance {
		margin-left: auto;
		margin-right: var(--space-3);
	}

	button {
		display: inline-block;
		line-height: 1.3rem;
		font-size: 1.2rem;
		color: var(--text-color);
		border-radius: var(--rounded);
		border: 2px solid var(--text-color);
		background-color: transparent;

		:hover {
			color: white;
			border-color: var(--darker-green);
			background-color: var(--darker-green);
		}
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

const SlippageControl = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: var(--space-3);
	padding-right: var(--space-3);

	label {
		margin-right: var(--space-2);
	}

	button,
	input[type='text'] {
		width: 25%;
		margin-right: 3px;
		font-size: 1.2rem;
		color: var(--text-color);
		border-radius: var(--rounded);
		border: 2px solid var(--text-color);
		background-color: transparent;

		:focus,
		:hover {
			color: white;
			border-color: var(--darker-green);
			background-color: var(--darker-green);
		}
	}

	input[type='text'] {
		margin-right: 0px;
		padding: 0px var(--space-1);
		text-align: center;
	}
`;

const SlippageSelector = styled.div`
	display: flex;
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
