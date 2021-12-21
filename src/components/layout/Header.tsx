import { ConnectWalletButton } from 'components/wallet/ConnectWalletButton';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { WalletButton } from '../wallet/WalletButton';

export function Header() {
	const { status } = useWallet();

	return (
		<header>
			{status === WalletStatus.WALLET_NOT_CONNECTED && <ConnectWalletButton />}
			{status === WalletStatus.WALLET_CONNECTED && <WalletButton />}
		</header>
	);
}
