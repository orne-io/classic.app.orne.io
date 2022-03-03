import Decimal from 'decimal.js';
import { useState } from 'react';
import { readAmount, toAmount } from '@terra.kitchen/utils';
import { useProvideLiquidity } from 'hooks/useProvideLiquidity';
import { useTerraNativeBalances } from 'hooks/useTerraNativeBalances';
import { useSwapSimulation } from 'hooks/useSwapSimulation';
import { ActionSeparator } from 'components/common';
import { AmountBox } from 'components/form';
import { Box, Button, Flex, Grid, Table, Text } from 'components/ui';

export function Provide() {
	const { uUST } = useTerraNativeBalances();
	const { provide } = useProvideLiquidity();
	const { simulate } = useSwapSimulation();

	const [amountOrne, setAmountOrne] = useState<string | null>('');
	const [amountUst, setAmountUst] = useState<string | null>('');

	async function handleUstAmountChange(amount: string) {
		setAmountUst(amount);

		const estimatedReturn = await simulate({ amountUst: amount }).then(
			({ return_amount, spread_amount, commission_amount }) =>
				new Decimal(return_amount).plus(spread_amount).plus(commission_amount)
		);

		setAmountOrne(readAmount(estimatedReturn));
	}

	async function handleOrneAmountChange(amount: string) {
		setAmountOrne(amount);

		const estimatedReturn = await simulate({ amountOrne: amount }).then(
			({ return_amount, spread_amount, commission_amount }) =>
				new Decimal(return_amount).plus(spread_amount).plus(commission_amount)
		);

		setAmountUst(readAmount(estimatedReturn));
	}

	function handleSubmit(e) {
		e.preventDefault();

		if (!amountOrne || !amountUst) return;

		provide({ amountUst, amountOrne });
	}

	return (
		<Grid as="form" gap={2} onSubmit={handleSubmit}>
			<Flex align="center" gap={2}>
				<Text>Stake ORNE and UST</Text>
				<Button type="button" size="small" outline="dark">
					Max
				</Button>
			</Flex>

			<Flex justify="between" css={{ width: '100%' }}>
				<AmountBox denom="ORNE" balance={'420'} value={amountOrne} onChange={handleOrneAmountChange} />

				<Flex align="center" justify="center" css={{ p: '$3', width: '25%' }}>
					<ActionSeparator>
						<img src="/icons/plus.svg" alt="" />
					</ActionSeparator>
				</Flex>

				<AmountBox denom="UST" balance={uUST} value={amountUst} onChange={handleUstAmountChange} />
			</Flex>

			<Flex justify="between">
				<Box>
					<Table values>
						<tbody>
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
						</tbody>
					</Table>
				</Box>

				<Flex align="start" justify="end">
					<Button type="submit">Stake Tokens</Button>
				</Flex>
			</Flex>
		</Grid>
	);
}
