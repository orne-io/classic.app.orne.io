import { useDebounce } from 'use-debounce';
import { useLpBalance } from 'hooks/useLpBalance';
import { useWithdrawLiquidity } from 'hooks/useWithdrawLiquidity';
import { ActionSeparator } from 'components/common';
import { AmountBox } from 'components/form';
import { TokenIcon } from 'components/tokens';
import { Button, Flex, Grid, Text } from 'components/ui';
import { useState } from 'react';
import { useShare } from '../../hooks/useShare';
import { readAmount, toAmount } from '@terra.kitchen/utils';
import { ThreeDots } from 'react-loader-spinner';
import { useConnectedWallet } from '@terra-money/wallet-provider';

export function Withdraw() {
	const connectedWallet = useConnectedWallet();
	const { data: balance, isLoadingLpBalance } = useLpBalance();
	const { withdraw } = useWithdrawLiquidity();
	const [amount, setAmount] = useState('');
	const [debouncedAmount] = useDebounce(amount, 300);

	const { data: withdrawing, isLoading } = useShare(toAmount(debouncedAmount));

	const hasConnectedWallet = connectedWallet !== undefined;

	function handleSubmit() {
		withdraw({ amount });
	}

	if (!hasConnectedWallet) {
		return <Text>Please, connect a wallet to continue</Text>;
	}

	return (
		<Flex direction={'column'} gap={2}>
			<Flex align="center" gap={2}>
				<Text>Withdraw ORNE / UST Liquidity</Text>
			</Flex>
			<Flex direction="column" gap={3}>
				<AmountBox
					hasConnectedWallet={hasConnectedWallet}
					hasMax={true}
					denom={'LP'}
					balance={balance || '0'}
					loadingBalance={isLoadingLpBalance}
					value={amount}
					onChange={setAmount}
				/>
				<Flex align="center" justify="center">
					<ActionSeparator>
						<img src="/icons/swapping.svg" alt="" />
					</ActionSeparator>
				</Flex>
				<Flex
					align="center"
					justify="between"
					direction={{ '@initial': 'column', '@md': 'row' }}
					gap={{ '@initial': 3, '@md': 1 }}
					css={{ backgroundColor: '$lightGreen', borderRadius: '$rounded', boxShadow: '$base', p: '$2 $3' }}
				>
					<Flex gap={2}>
						{isLoading ? (
							<Flex align="center">
								<ThreeDots color="hsl(203,23%,42%)" height="10" />
							</Flex>
						) : (
							<Text>{withdrawing && readAmount(withdrawing.amountOrne, { comma: true })}</Text>
						)}
						<TokenIcon>
							<img src="/images/orne-logo.svg" alt="" />
						</TokenIcon>
						<Text>ORNE</Text>
					</Flex>
					<ActionSeparator>
						<img src="/icons/plus.svg" alt="" />
					</ActionSeparator>
					<Flex gap={2}>
						{isLoading ? (
							<Flex align="center">
								<ThreeDots color="hsl(203,23%,42%)" height="10" />
							</Flex>
						) : (
							<Text>{withdrawing && readAmount(withdrawing.amountUst, { comma: true })}</Text>
						)}

						<TokenIcon>
							<img src="/icons/ust.svg" alt="" />
						</TokenIcon>
						<Text>UST</Text>
					</Flex>
				</Flex>
				<Button onClick={handleSubmit}>Withdraw</Button>
			</Flex>
		</Flex>
	);
}
