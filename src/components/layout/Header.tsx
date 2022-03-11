import { Oval } from 'react-loader-spinner';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { styled } from 'stitches.config';
import { ConnectWalletButton } from 'components/wallet/ConnectWalletButton';
import { WalletButton } from '../wallet/WalletButton';
import { Flex, Text } from 'components/ui';
import { usePendingTransaction } from 'hooks/usePendingTransaction';

const Logo = styled('img', {
	height: '50px',
	width: '50px',
});

export function Header() {
	const { status } = useWallet();
	const { pendingTransactions } = usePendingTransaction();

	return (
		<Flex
			as="header"
			justify="between"
			css={{ 'py': '$5', 'px': '$3', '@media (min-width: 768px)': { py: '$5', px: '$6' } }}
		>
			<Logo src="/images/orne-logo.svg" alt="Orne.io" />

			<Flex gap={4}>
				{pendingTransactions.length > 0 && (
					<Flex
						gap={5}
						align="center"
						css={{ backgroundColor: '$lightGreen', borderRadius: '50px', boxShadow: '$base', px: '$4' }}
					>
						<Oval
							ariaLabel="loading-indicator"
							height={25}
							width={25}
							strokeWidth={5}
							color="hsl(203,23%,42%)"
							secondaryColor="hsl(173,29%,76%)"
						/>
						<Text size={1}>Pending Transaction...</Text>
					</Flex>
				)}
				{status === WalletStatus.WALLET_NOT_CONNECTED && <ConnectWalletButton />}
				{status === WalletStatus.WALLET_CONNECTED && <WalletButton />}
			</Flex>
		</Flex>
	);
}
