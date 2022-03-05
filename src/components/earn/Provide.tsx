import Decimal from 'decimal.js';
import { useState } from 'react';
import { readAmount, toAmount } from '@terra.kitchen/utils';
import { useProvideLiquidity } from 'hooks/useProvideLiquidity';
import { useSwapSimulation } from 'hooks/useSwapSimulation';
import { ActionSeparator } from 'components/common';
import { AmountBox } from 'components/form';
import { Button, Flex, Grid, Text } from 'components/ui';
import { useUstBalance } from 'hooks/useUstBalance';
import { useOrneBalance } from 'hooks/useOrneBalance';
import { useConnectedWallet } from '@terra-money/wallet-provider';

export function Provide() {
	const connectedWallet = useConnectedWallet();
	const { data: ust, isLoading: isLoadingUst } = useUstBalance();
	const { data: orne, isLoading: isLoadingOrne } = useOrneBalance();
	const { provide } = useProvideLiquidity();
	const { simulate } = useSwapSimulation();

	const [amountOrne, setAmountOrne] = useState<string | null>('');
	const [amountUst, setAmountUst] = useState<string | null>('');

	const hasConnectedWallet = connectedWallet !== undefined;

	const [fetchingMax, setFetchingMax] = useState(false);
	async function useMaxAmount() {
		setFetchingMax(true);

		const estimatedReturn = await simulate({ amountOrne: readAmount(orne) }).then(
			({ return_amount, spread_amount, commission_amount }) =>
				new Decimal(return_amount).plus(spread_amount).plus(commission_amount)
		);

		if (+readAmount(estimatedReturn) < +ust) {
			const estimatedReturn = await simulate({ amountUst: readAmount(ust) }).then(
				({ return_amount, spread_amount, commission_amount }) =>
					new Decimal(return_amount).plus(spread_amount).plus(commission_amount)
			);

			setAmountUst(readAmount(ust));
			setAmountOrne(readAmount(estimatedReturn));
			setFetchingMax(false);
			return;
		}

		setAmountUst(readAmount(estimatedReturn));
		setAmountOrne(readAmount(orne));
		setFetchingMax(false);
	}

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

	if (!hasConnectedWallet) {
		return <Text>Please, connect a wallet to continue</Text>;
	}

	return (
		<Grid as="form" gap={2} onSubmit={handleSubmit}>
			<Flex align="center" gap={2}>
				<Text>Stake ORNE and UST</Text>
				<Button type="button" size="small" outline="dark" onClick={useMaxAmount}>
					Max
				</Button>
			</Flex>

			<Flex justify="between" css={{ width: '100%' }}>
				<AmountBox
					hasConnectedWallet={hasConnectedWallet}
					denom="ORNE"
					balance={orne}
					loadingBalance={isLoadingOrne}
					value={amountOrne}
					loading={fetchingMax}
					onChange={handleOrneAmountChange}
				/>

				<Flex align="center" justify="center" css={{ p: '$3', width: '25%' }}>
					<ActionSeparator>
						<img src="/icons/plus.svg" alt="" />
					</ActionSeparator>
				</Flex>

				<AmountBox
					hasConnectedWallet={hasConnectedWallet}
					denom="UST"
					balance={ust}
					loadingBalance={isLoadingUst}
					value={amountUst}
					loading={fetchingMax}
					onChange={handleUstAmountChange}
				/>
			</Flex>

			<Flex align="start" justify="end">
				<Button type="submit">Stake Tokens</Button>
			</Flex>
		</Grid>
	);
}
