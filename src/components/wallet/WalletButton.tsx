import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useWallet } from '@terra-money/wallet-provider';

export function WalletButton() {
	// const {} =
	const { disconnect, wallets } = useWallet();

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>{wallets[0].terraAddress}</DropdownMenu.Trigger>

			<DropdownMenu.Content>
				<DropdownMenu.Item onClick={() => disconnect()}>Disconnect</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}
