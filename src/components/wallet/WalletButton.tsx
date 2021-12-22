import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useWallet } from '@terra-money/wallet-provider';
import { useTerraNativeBalances } from 'hooks/useTerraNativeBalances';
import { string, formatter } from 'utils';
import { Trigger, Balance, WalletAddress, WalletIcon, Content, Item } from './ButtonStyle';

const numberFormatter = new Intl.NumberFormat('en-US', { style: 'decimal' });

export function WalletButton() {
	const { uUST } = useTerraNativeBalances();
	const { disconnect, wallets } = useWallet();

	return (
		<DropdownMenu.Root>
			<Trigger>
				<Balance>{numberFormatter.format(formatter.demicrofy(uUST))} UST</Balance>
				<WalletAddress>
					<WalletIcon src="/icons/wallet.svg" alt="" />
					{string.truncate(wallets[0].terraAddress, [10, 5])}
				</WalletAddress>
			</Trigger>

			<Content align="start">
				<Item onClick={() => disconnect()}>Disconnect</Item>
			</Content>
		</DropdownMenu.Root>
	);
}
