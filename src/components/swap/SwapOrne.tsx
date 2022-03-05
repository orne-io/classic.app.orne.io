import Decimal from 'decimal.js';
import { Slippage } from 'components/tx/Slippage';
import { FormEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Fee } from '@terra-money/terra.js';
import { useSwap } from 'hooks/useSwap';
import { useIsFirstRender } from 'hooks/useIsFirstRender';
import { useOrneBalance } from 'hooks/useOrneBalance';
import { useEstimateFee } from 'hooks/useEstimateFee';
import { useSwapSimulation } from 'hooks/useSwapSimulation';
import { Box, Button, Flex, Table, Text } from 'components/ui';
import { AmountBox } from 'components/form';
import { ActionSeparator } from 'components/common';
import { readAmount } from '@terra.kitchen/utils';
import { ThreeDots } from 'react-loader-spinner';
import { useConnectedWallet } from '@terra-money/wallet-provider';

export function SwapOrne({ onChangeDirection }) {
	const [error, setError] = useState('');
	const connectedWallet = useConnectedWallet();
	const [amount, setAmount] = useState<string | null>();
	const [debouncedAmount] = useDebounce(amount, 300);
	const [slippage, setSlippage] = useState<number>(1);
	const [debouncedSlippage] = useDebounce(slippage, 300);
	const [fee, setFee] = useState<Fee | null>();
	const [estimatedUst, setEstimatedUst] = useState<string>('0');

	const { swap } = useSwap();
	const { data: orne, isLoading: isLoadingOrne } = useOrneBalance();
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
			simulate({ amountOrne: debouncedAmount }),
			estimate({ amountOrne: debouncedAmount, slippage: debouncedSlippage.toString() }),
		])
			.then(([simulation, fee]) => {
				setEstimatedUst(simulation.return_amount);
				setFee(fee);
				setSimulating(false);
			})
			.catch((e) => {
				const errorCode = e.response.data?.code;
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
		amount && estimate ? new Decimal(estimatedUst).dividedBy(amount).dividedBy(1_000_000).toFixed(6) : '0';
	const feePrice = fee?.amount?.get('uusd')?.amount.dividedBy(1_000_000).toFixed(6) || '0';

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (!amount) {
			return;
		}

		swap({ amountOrne: amount, slippage: slippage.toString() });
	}

	function resetValues() {
		setEstimatedUst('0');
		setFee(null);
	}

	return (
		<Flex as="form" direction="column" autoComplete="off" onSubmit={handleSubmit}>
			<Flex justify="between" css={{ width: '100%' }}>
				<AmountBox
					hasConnectedWallet={connectedWallet !== undefined}
					hasMax={true}
					denom="ORNE"
					balance={orne}
					loadingBalance={isLoadingOrne}
					value={amount}
					onChange={setAmount}
				/>

				<Flex align="center" justify="center" css={{ p: '$3', width: '25%' }}>
					<ActionSeparator onClick={() => onChangeDirection()} css={{ cursor: 'pointer' }}>
						<img src="/icons/swapping.svg" alt="" />
					</ActionSeparator>
				</Flex>

				<AmountBox label="Estimated" denom="UST" value={readAmount(estimatedUst)} loading={simulating} disabled />
			</Flex>

			<Flex align="start">
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

				<Flex gap={2} direction="column" css={{ px: '$3', width: '100%' }}>
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
