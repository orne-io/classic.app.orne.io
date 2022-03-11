import { useEffect, useState } from 'react';
import { Provide } from 'components/earn/Provide';
import { Withdraw } from 'components/earn/Withdraw';
import { TokenPair, TokenIcon } from 'components/tokens';
import { Box, Button, Flex, Grid, Heading, Paragraph, Text } from 'components/ui';
import { useLpReward } from '../hooks/useLpReward';
import { readAmount, readPercent } from '@terra.kitchen/utils';
import { useClaimReward } from '../hooks/useClaimReward';
import { useLpBalance } from '../hooks/useLpBalance';
import { ThreeDots } from 'react-loader-spinner';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { usePool } from '../hooks/usePool';
import { Dec } from '@terra-money/terra.js';

enum EarnSection {
	Provide,
	Withdraw,
}

export function Earn() {
	const connectedWallet = useConnectedWallet();
	const { data: pool, isLoading: isLoadingPool } = usePool();
	const [sectionToDisplay, setSectionToDisplay] = useState<EarnSection>(EarnSection.Provide);
	const { data: lpBalance, isLoading: isLoadingLpBalance } = useLpBalance();
	const { data: reward, isLoading: isLoadingReward } = useLpReward();
	const { mutate: withdrawReward } = useClaimReward();

	const hasConnectedWallet = connectedWallet !== undefined;

	const [APR, setAPR] = useState();
	const [liquidity, setLiquidity] = useState();

	useEffect(() => {
		if (!pool) return;

		const liquidity = pool.ust.plus(pool.orne.times(pool.orne_price));
		setLiquidity(liquidity);
		setAPR(new Dec(10_000_00).times(pool.orne_price).dividedBy(readAmount(liquidity.dividedBy(100))));
	}, [pool]);

	function handleClaimReward() {
		withdrawReward();
	}

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
						{isLoadingPool ? (
							<Box css={{ mt: '$2' }}>
								<ThreeDots color="hsl(203,23%,42%)" height="10" />
							</Box>
						) : (
							<Text>{readPercent(APR)}</Text>
						)}
					</Flex>

					<Flex direction="column" align="end">
						<Text size={1}>Liquidity</Text>
						{isLoadingPool ? (
							<Box css={{ mt: '$2' }}>
								<ThreeDots color="hsl(203,23%,42%)" height="10" />
							</Box>
						) : (
							<Text>$ {readAmount(liquidity, { comma: true, fixed: 0 })}</Text>
						)}
					</Flex>

					<Flex direction="column" align="end">
						<Text size={1}>Staked</Text>
						{isLoadingLpBalance ? (
							<Box css={{ mt: '$2' }}>
								<ThreeDots color="hsl(203,23%,42%)" height="10" />
							</Box>
						) : (
							<Text>~ {readAmount(lpBalance, { comma: true, fixed: 0 })} LP</Text>
						)}
					</Flex>

					<Flex direction="column" align="end">
						<Text size={1}>Rewards</Text>
						{isLoadingReward ? (
							<Box css={{ mt: '$2' }}>
								<ThreeDots color="hsl(203,23%,42%)" height="10" />
							</Box>
						) : (
							hasConnectedWallet && (
								<Flex gap={2} align="center">
									<Text>{readAmount(reward.pending_on_proxy)} ORNE</Text>
									{/*<Text as="small" size={0}>*/}
									{/*	(+ {readAmount(reward.pending)} ASTRO)*/}
									{/*</Text>*/}
								</Flex>
							)
						)}
						{hasConnectedWallet ? (
							<Button css={{ mt: '$2' }} size="small" outline="dark" onClick={handleClaimReward}>
								Claim
							</Button>
						) : (
							0
						)}
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
