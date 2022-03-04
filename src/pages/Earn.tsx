import { useState } from 'react';
import { Provide } from 'components/earn/Provide';
import { Withdraw } from 'components/earn/Withdraw';
import { TokenPair, TokenIcon } from 'components/tokens';
import { Box, Button, Flex, Grid, Heading, Paragraph, Text } from 'components/ui';
import { useLpReward } from '../hooks/useLpReward';
import { readAmount } from '@terra.kitchen/utils';

enum EarnSection {
	Provide,
	Withdraw,
}

export function Earn() {
	const [sectionToDisplay, setSectionToDisplay] = useState<EarnSection>(EarnSection.Provide);
	const { data: reward } = useLpReward();

	return (
		<Grid gap={2}>
			<Grid as="header" gap={2}>
				<Heading css={{ borderLeft: '5px solid $textColor', pl: '$3' }}>Earn</Heading>
				<Paragraph>Stake your tokens to earn ORNE</Paragraph>
			</Grid>

			<Grid gap={4}>
				<Flex
					align="start"
					justify="between"
					gap={3}
					css={{ backgroundColor: '$lightGreen', borderRadius: '$rounded', p: '$3' }}
				>
					<Flex alignSelf="center">
						<TokenPair>
							<TokenIcon>
								<img src="/images/orne-logo.svg" alt="Orne" />
							</TokenIcon>
							<TokenIcon>
								<img src="/icons/ust.svg" alt="UST" />
							</TokenIcon>
						</TokenPair>

						<Box css={{ mr: 'auto', whiteSpace: 'nowrap' }}>ORNE / UST</Box>
					</Flex>

					<Flex direction="column" align="end">
						<Text size={1}>APR</Text>
						<Text>124,32%</Text>
					</Flex>

					<Flex direction="column" align="end">
						<Text size={1}>Liquidity</Text>
						<Text>12,3m UST</Text>
					</Flex>

					<Flex direction="column" align="end">
						<Text size={1}>Staked</Text>
						<Text>1337,420 LP</Text>
					</Flex>

					<Flex direction="column" align="end">
						<Text size={1}>Rewards</Text>
						<Flex gap={2} align="center">
							<Text>{readAmount(reward.pending_on_proxy)} ORNE</Text>
							<Text as="small" size={0}>
								(+ {readAmount(reward.pending)} ASTRO)
							</Text>
						</Flex>
						<Button size="small" outline="dark">
							Claim
						</Button>
					</Flex>
				</Flex>

				<Flex justify="end" gap={2}>
					<Button onClick={() => setSectionToDisplay(EarnSection.Provide)}>Provide</Button>
					<Button outline="dark" onClick={() => setSectionToDisplay(EarnSection.Withdraw)}>
						Withdraw
					</Button>
				</Flex>
			</Grid>

			{sectionToDisplay === EarnSection.Provide ? <Provide /> : <Withdraw />}
		</Grid>
	);
}
