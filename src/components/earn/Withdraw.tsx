import { useTerraNativeBalances } from 'hooks/useTerraNativeBalances';
import { useWithdrawLiquidity } from 'hooks/useWithdrawLiquidity';
import { ActionSeparator } from 'components/common';
import { AmountBox } from 'components/form';
import { TokenIcon } from 'components/tokens';
import { Button, Flex, Grid, Text } from 'components/ui';

export function Withdraw() {
	const { uUST } = useTerraNativeBalances();
	const {} = useWithdrawLiquidity();

	return (
		<Grid gap={2}>
			<Flex align="center" gap={2}>
				<Text>Withdraw ORNE / UST Liquidity</Text>
				<Button type="button" size="small" outline="dark">
					Max
				</Button>
			</Flex>

			<Flex direction="column" gap={3}>
				<AmountBox denom={'LP'} balance={'10'} value={'0'} onChange={() => {}} />

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
						<Text>1321</Text>
						<TokenIcon>
							<img src="/images/orne-logo.svg" alt="" />
						</TokenIcon>
						<Text>ORNE</Text>
					</Flex>

					<ActionSeparator>
						<img src="/icons/plus.svg" alt="" />
					</ActionSeparator>

					<Flex gap={2}>
						<Text>40</Text>
						<TokenIcon>
							<img src="/icons/ust.svg" alt="" />
						</TokenIcon>
						<Text>UST</Text>
					</Flex>
				</Flex>
			</Flex>
		</Grid>
	);
}
