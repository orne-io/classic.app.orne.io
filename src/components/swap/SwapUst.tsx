import Decimal from 'decimal.js';
import { FormEvent, useEffect, useState } from 'react';
import { Fee } from '@terra-money/terra.js';
import { useDebounce } from 'use-debounce';
import { useSwap } from 'hooks/useSwap';
import { useEstimateFee } from 'hooks/useEstimateFee';
import { useIsFirstRender } from 'hooks/useIsFirstRender';
import { Slippage } from 'components/tx/Slippage';
import { useTerraNativeBalances } from 'hooks/useTerraNativeBalances';
import { useSwapSimulation } from 'hooks/useSwapSimulation';

import { AmountBox } from 'components/form';
import { ActionSeparator } from 'components/common';
import { Box, Button, Flex, Table, Text } from 'components/ui';
import { readAmount } from '@terra.kitchen/utils';

export function SwapUst({ onChangeDirection }) {
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

	return (
		<Flex as="form" direction="column" autoComplete="off" onSubmit={handleSubmit}>
			<Flex justify="between" css={{ width: '100%' }}>
				<AmountBox hasMax={true} denom="UST" balance={uUST} value={amount} onChange={setAmount} />

				<Flex align="center" justify="center" css={{ p: '$3', width: '25%' }}>
					<ActionSeparator onClick={() => onChangeDirection()} css={{ cursor: 'pointer' }}>
						<img src="/icons/swapping.svg" alt="" />
					</ActionSeparator>
				</Flex>

				<AmountBox label="Estimated" denom="ORNE" value={readAmount(estimatedOrne)} disabled />
			</Flex>

			<Flex align="start">
				<Table values>
					<tbody>
						<tr>
							<td>Price per $ORNE</td>
							<td>{pricePerOrne} UST</td>
						</tr>
						<tr>
							<td>Tx Fee</td>
							<td>{feePrice} UST</td>
						</tr>
					</tbody>
				</Table>

				<Box css={{ p: '$3', width: '25%' }} />

				<Flex gap={4} direction="column" css={{ px: '$3', width: '100%' }}>
					<Slippage slippage={slippage} onSlippageChange={(s) => setSlippage(s)} />

					<Button type="submit">Swap</Button>

					{error && <Text color="red">{error}</Text>}
				</Flex>
			</Flex>
		</Flex>
	);
}
