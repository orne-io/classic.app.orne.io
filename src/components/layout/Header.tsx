import { ConnectWalletButton } from 'components/wallet/ConnectWalletButton';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { WalletButton } from '../wallet/WalletButton';
import styled from 'styled-components';

export function Header() {
	const { status } = useWallet();

	return (
		<HeaderWrapper>
			<Logo src="/images/orne-logo.svg" alt="Orne.io" />

			<div>
				{status === WalletStatus.WALLET_NOT_CONNECTED && <ConnectWalletButton />}
				{status === WalletStatus.WALLET_CONNECTED && <WalletButton />}
			</div>
		</HeaderWrapper>
	);
}

const Logo = styled.img`
	height: 50px;
	width: 50px;
`;

const HeaderWrapper = styled.header`
	display: flex;
	justify-content: space-between;
	padding: var(--space-5) var(--space-6);
`;
