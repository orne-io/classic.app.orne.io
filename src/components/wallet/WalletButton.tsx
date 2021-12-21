import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useWallet } from '@terra-money/wallet-provider';
import { useTerraNativeBalances } from 'hooks/useTerraNativeBalances';
import { string, formatter } from 'utils';

const numberFormatter = new Intl.NumberFormat('en-US', { style: 'decimal' });

export function WalletButton() {
	const { uUST } = useTerraNativeBalances();
	const { disconnect, wallets } = useWallet();

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{numberFormatter.format(formatter.demicrofy(uUST))} UST {string.truncate(wallets[0].terraAddress, [10, 5])}
			</DropdownMenu.Trigger>

			<DropdownMenu.Content>
				<DropdownMenu.Item onClick={() => disconnect()}>Disconnect</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}
