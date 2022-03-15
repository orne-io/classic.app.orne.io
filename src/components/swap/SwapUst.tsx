import { FormEvent, useEffect, useState } from 'react';
import { Dec, Fee } from '@terra-money/terra.js';
import { useDebounce } from 'use-debounce';
import { useSwap } from 'hooks/useSwap';
import { useEstimateFee } from 'hooks/useEstimateFee';
import { useIsFirstRender } from 'hooks/useIsFirstRender';
import { Slippage } from 'components/tx/Slippage';
import { useSwapSimulation } from 'hooks/useSwapSimulation';

import { AmountBox } from 'components/form';
import { ActionSeparator } from 'components/common';
import { Box, Button, Flex, Table, Text } from 'components/ui';
import { readAmount } from '@terra.kitchen/utils';
import { ThreeDots } from 'react-loader-spinner';
import { useUstBalance } from '../../hooks/useUstBalance';
import { useConnectedWallet } from '@terra-money/wallet-provider';

export function SwapUst({ onChangeDirection }) {
	const connectedWallet = useConnectedWallet();
	const [error, setError] = useState('');
	const [amount, setAmount] = useState<string>('');
	const [debouncedAmount] = useDebounce(amount, 300);
	const [slippage, setSlippage] = useState<number>(1);
	const [debouncedSlippage] = useDebounce(slippage, 300);
	const [fee, setFee] = useState<Fee | null>();
	const [estimatedOrne, setEstimatedOrne] = useState<string>('0');

	const { swap } = useSwap();
	const { data: ust, isLoading: isLoadingUst } = useUstBalance();
	const isFirstRender = useIsFirstRender();

	const [simulating, setSimulating] = useState(false);
	const { estimate } = useEstimateFee();
	const { simulate } = useSwapSimulation();

	useEffect(() => {
		setError('');

		if (isFirstRender) {
			return;
		}

		if (!debouncedAmount) {
			resetValues();
			return;
		}

		setSimulating(true);

		Promise.all([
			simulate({ amountUst: debouncedAmount }),
			estimate({ amountUst: debouncedAmount, slippage: debouncedSlippage.toString() }),
		])
			.then(([simulation, fee]) => {
				setEstimatedOrne(simulation.return_amount);
				setFee(fee);
				setSimulating(false);
			})
			.catch((e) => {
				const errorCode = e.response?.data?.code;
				resetValues();
				setSimulating(false);

				if (!errorCode) {
					setError('Unknown error');
					return;
				}

				if (errorCode === 3) {
					setError('Please, increase your slippage');
				}
			});
	}, [debouncedAmount, debouncedSlippage]);

	const pricePerOrne =
		amount && estimatedOrne !== '0' ? new Dec(amount).times(1_000_000).dividedBy(estimatedOrne).toFixed(6) : '0';
	const feePrice = readAmount(fee?.amount?.get('uusd')?.amount, { comma: true }) || '0';

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (!amount) {
			return;
		}

		swap(
			{ amountUst: amount, slippage: slippage.toString(), beliefPrice: pricePerOrne },
			{
				onSuccess() {
					setAmount('');
				},
			}
		);
	}

	function resetValues() {
		setEstimatedOrne('0');
		setFee(null);
	}

	return (
		<Flex as="form" direction="column" autoComplete="off" onSubmit={handleSubmit}>
			<Flex justify="between" wrap={{ '@initial': 'wrap', '@md': 'noWrap' }} css={{ width: '100%' }}>
				<AmountBox
					hasConnectedWallet={connectedWallet !== undefined}
					hasMax={true}
					lowerMaxBy={2}
					denom="UST"
					balance={ust}
					loadingBalance={isLoadingUst}
					value={amount}
					onChange={setAmount}
				/>

				<Flex align="center" justify="center" css={{ 'p': '$3', 'width': '100%', '@md': { width: '25%' } }}>
					<ActionSeparator onClick={() => onChangeDirection()} css={{ cursor: 'pointer' }}>
						<img src="/icons/swapping.svg" alt="" />
					</ActionSeparator>
				</Flex>

				<AmountBox label="Estimated" denom="ORNE" value={readAmount(estimatedOrne)} loading={simulating} disabled />
			</Flex>

			<Flex align="start" wrap={{ '@initial': 'wrap', '@md': 'noWrap' }}>
				<Table values>
					<tbody>
						<tr>
							<td>Price per $ORNE</td>
							{simulating ? (
								<td>
									<Box style={{ display: 'flex', justifyContent: 'end' }}>
										<ThreeDots color="hsl(203,23%,42%)" height="10" />
									</Box>
								</td>
							) : (
								<td>{pricePerOrne} UST</td>
							)}
						</tr>
						<tr>
							<td>Tx Fee</td>
							{simulating ? (
								<td>
									<Box style={{ display: 'flex', justifyContent: 'end' }}>
										<ThreeDots color="hsl(203,23%,42%)" height="10" />
									</Box>
								</td>
							) : (
								<td>{feePrice} UST</td>
							)}
						</tr>
					</tbody>
				</Table>

				<Box css={{ p: '$3', width: '25%' }} />

				<Flex gap={4} direction="column" css={{ 'px': '0', 'width': '100%', '@md': { px: '$3' } }}>
					<Slippage slippage={slippage} onSlippageChange={(s) => setSlippage(s)} />

					<Button type="submit" disabled={simulating}>
						Swap
					</Button>

					{error && <Text color="red">{error}</Text>}
				</Flex>
			</Flex>
		</Flex>
	);
}
