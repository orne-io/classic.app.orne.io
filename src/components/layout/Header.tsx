import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { styled } from 'stitches.config';
import { ConnectWalletButton } from 'components/wallet/ConnectWalletButton';
import { WalletButton } from '../wallet/WalletButton';
import { Flex } from '../ui';

const Logo = styled('img', {
	height: '50px',
	width: '50px',
});

export function Header() {
	const { status } = useWallet();

	return (
		<Flex
			as="header"
			justify="between"
			css={{ 'py': '$5', 'px': '$3', '@media (min-width: 768px)': { py: '$5', px: '$6' } }}
		>
			<Logo src="/images/orne-logo.svg" alt="Orne.io" />

			<div>
				{status === WalletStatus.WALLET_NOT_CONNECTED && <ConnectWalletButton />}
				{status === WalletStatus.WALLET_CONNECTED && <WalletButton />}
			</div>
		</Flex>
	);
}
