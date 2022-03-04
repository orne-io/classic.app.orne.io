import { useLpBalance } from 'hooks/useLpBalance';
import { useWithdrawLiquidity } from 'hooks/useWithdrawLiquidity';
import { ActionSeparator } from 'components/common';
import { AmountBox } from 'components/form';
import { TokenIcon } from 'components/tokens';
import { Button, Flex, Grid, Text } from 'components/ui';
import { useState } from 'react';
import { useShare } from '../../hooks/useShare';
import { readAmount, toAmount } from '@terra.kitchen/utils';

export function Withdraw() {
	const { data: balance } = useLpBalance();
	const { withdraw } = useWithdrawLiquidity();
	const [amount, setAmount] = useState('');

	const { data: withdrawing } = useShare(toAmount(amount));

	function handleSubmit() {
		withdraw({ amount });
	}

	return (
		<Grid gap={2}>
			<Flex align="center" gap={2}>
				<Text>Withdraw ORNE / UST Liquidity</Text>
			</Flex>
			<Flex direction="column" gap={3}>
				<AmountBox hasMax={true} denom={'LP'} balance={balance || '0'} value={amount} onChange={setAmount} />
				<Flex align="center" justify="center">
					<ActionSeparator>
						<img src="/icons/swapping.svg" alt="" />
					</ActionSeparator>
				</Flex>
				<Flex
					align="center"
					justify="between"
					css={{ backgroundColor: '$lightGreen', borderRadius: '$rounded', p: '$2 $3' }}
				>
					<Flex gap={2}>
						<Text>{withdrawing && readAmount(withdrawing.amountOrne, { comma: true })}</Text>
						<TokenIcon>
							<img src="/images/orne-logo.svg" alt="" />
						</TokenIcon>
						<Text>ORNE</Text>
					</Flex>
					<ActionSeparator>
						<img src="/icons/plus.svg" alt="" />
					</ActionSeparator>
					<Flex gap={2}>
						<Text>{withdrawing && readAmount(withdrawing.amountUst, { comma: true })}</Text>
						<TokenIcon>
							<img src="/icons/ust.svg" alt="" />
						</TokenIcon>
						<Text>UST</Text>
					</Flex>
				</Flex>
				<Button onClick={handleSubmit}>Withdraw</Button>
			</Flex>
		</Grid>
	);
}
