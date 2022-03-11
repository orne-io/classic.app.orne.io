import Decimal from 'decimal.js';
import { useState } from 'react';
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { readAmount } from '@terra.kitchen/utils';
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

	const [amountOrne, setAmountOrne] = useState<string>('');
	const [amountUst, setAmountUst] = useState<string>('');

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

	const [fetchingOrne, setFetchingOrne] = useState(false);
	const computeOrneReturns = useDebouncedCallback(async (amount: string) => {
		setFetchingOrne(true);
		const estimatedReturn = await simulate({ amountUst: amount }).then(
			({ return_amount, spread_amount, commission_amount }) =>
				new Decimal(return_amount).plus(spread_amount).plus(commission_amount)
		);

		if (amountUst) {
			setAmountOrne(readAmount(estimatedReturn));
		}
		setFetchingOrne(false);
	}, 700);

	const [fetchingUst, setFetchingUst] = useState(false);
	const computeUstReturns = useDebouncedCallback(async (amount: string) => {
		setFetchingUst(true);
		const estimatedReturn = await simulate({ amountOrne: amount }).then(
			({ return_amount, spread_amount, commission_amount }) =>
				new Decimal(return_amount).plus(spread_amount).plus(commission_amount)
		);

		if (amountOrne) {
			setAmountUst(readAmount(estimatedReturn));
		}
		setFetchingUst(false);
	}, 700);

	async function handleUstAmountChange(amount: string) {
		setAmountUst(amount);

		if (!amount) {
			setAmountOrne('');
			return;
		}

		computeOrneReturns(amount);
	}
	async function handleOrneAmountChange(amount: string) {
		setAmountOrne(amount);

		if (!amount) {
			setAmountUst('');
			return;
		}

		computeUstReturns(amount);
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
					loading={fetchingMax || fetchingOrne}
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
					loading={fetchingMax || fetchingUst}
					onChange={handleUstAmountChange}
				/>
			</Flex>

			<Flex align="start" justify="end">
				<Button type="submit">Stake Tokens</Button>
			</Flex>
		</Grid>
	);
}
