import { ThreeDots } from 'react-loader-spinner';
import { readAmount, truncate } from '@terra.kitchen/utils';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useWallet } from '@terra-money/wallet-provider';
import { useUstBalance } from 'hooks/useUstBalance';
import { Trigger, Balance, WalletAddress, WalletIcon, Content, Item, WalletAddressString } from './ButtonStyle';

export function WalletButton() {
	const { data: ust, isLoading } = useUstBalance();
	const { disconnect, wallets } = useWallet();

	return (
		<DropdownMenu.Root>
			<Trigger>
				{isLoading ? (
					<ThreeDots color="hsl(203,23%,42%)" height="10" />
				) : (
					<Balance>{readAmount(ust, { comma: true, fixed: 3 })} UST</Balance>
				)}
				<WalletAddress>
					<WalletIcon src="/icons/wallet.svg" alt="" />
					<WalletAddressString>{truncate(wallets[0].terraAddress)}</WalletAddressString>
				</WalletAddress>
			</Trigger>

			<Content align="start">
				<Item onClick={() => disconnect()}>Disconnect</Item>
			</Content>
		</DropdownMenu.Root>
	);
}
