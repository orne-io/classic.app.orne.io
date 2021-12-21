import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ConnectType, useWallet } from '@terra-money/wallet-provider';

const ConnectionNameDict: Partial<Record<ConnectType, string>> = {
	[ConnectType.CHROME_EXTENSION]: 'Extension',
	[ConnectType.WALLETCONNECT]: 'Wallet Connect',
};

export function ConnectWalletButton() {
	const { availableConnectTypes, connect } = useWallet();
	const allowedConnection = availableConnectTypes.filter((c) =>
		[ConnectType.CHROME_EXTENSION, ConnectType.WALLETCONNECT].includes(c)
	);

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>Connect Wallet</DropdownMenu.Trigger>

			<DropdownMenu.Content>
				{allowedConnection.map((connection) => (
					<DropdownMenu.Item key={connection} onClick={() => connect(connection)}>
						{ConnectionNameDict[connection]}
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}
