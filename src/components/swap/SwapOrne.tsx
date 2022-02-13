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

export function SwapOrne({ onChangeDirection }) {
	const [error, setError] = useState('');
	const [amount, setAmount] = useState<string | null>();
	const [debouncedAmount] = useDebounce(amount, 200);
	const [slippage, setSlippage] = useState<number>(1);
	const [fee, setFee] = useState<Fee | null>();
	const [estimatedUst, setEstimatedUst] = useState<string>('0');

	const { swap } = useSwap();
	const { data: orne } = useOrneBalance();
	const isFirstRender = useIsFirstRender();

	const { estimate } = useEstimateFee();
	const { simulate } = useSwapSimulation();

	useEffect(() => {
		setError('');

		if (isFirstRender || !debouncedAmount) {
			return;
		}

		Promise.all([
			simulate({ amountOrne: debouncedAmount }),
			estimate({ amountOrne: debouncedAmount, slippage: slippage.toString() }),
		])
			.then(([simulation, fee]) => {
				setEstimatedUst(simulation.return_amount);
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
		amount && estimate ? new Decimal(estimatedUst).dividedBy(amount).dividedBy(1_000_000).toFixed(6) : '0';
	const feePrice = fee?.amount?.get('uusd')?.amount.dividedBy(1_000_000).toFixed(6) || '0';

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (!amount) {
			return;
		}

		swap({ amountOrne: amount, slippage: slippage.toString() });
	}

	return (
		<Flex as="form" direction="column" autoComplete="off" onSubmit={handleSubmit}>
			<Flex justify="between" css={{ width: '100%' }}>
				<AmountBox hasMax={true} denom="ORNE" balance={orne?.balance} value={amount} onChange={setAmount} />

				<Flex align="center" justify="center" css={{ p: '$3', width: '25%' }}>
					<ActionSeparator onClick={() => onChangeDirection()} css={{ cursor: 'pointer' }}>
						<img src="/icons/swapping.svg" alt="" />
					</ActionSeparator>
				</Flex>

				<AmountBox label="Estimated" denom="UST" value={estimatedUst} disabled />
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

				<Flex gap={2} direction="column" css={{ px: '$3', width: '100%' }}>
					<Slippage slippage={slippage} onSlippageChange={(s) => setSlippage(s)} />

					<Button type="submit">Swap</Button>

					{error && <Text color="red">{error}</Text>}
				</Flex>
			</Flex>
		</Flex>
	);
}
