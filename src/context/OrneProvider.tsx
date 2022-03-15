import type { ReactNode } from 'react';
import { createContext, useMemo } from 'react';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import type { HumanAddr } from 'types';
import { ORNE_CONTRACT_ADDRESS } from 'env';
import { Triangle } from 'react-loader-spinner';

export type OrneContextData = {
	contractAddress: Record<string, HumanAddr>;
};

export const OrneContext = createContext<OrneContextData>({} as OrneContextData);

export function OrneProvider({ children }: { children: ReactNode }) {
	const { network, status } = useWallet();

	const client = useMemo(
		() => ({
			contractAddress: ORNE_CONTRACT_ADDRESS(network),
		}),
		[network]
	);

	if (status === WalletStatus.INITIALIZING) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					gap: '8px',
				}}
			>
				<Triangle ariaLabel="Loading the dApp" color="hsl(203,23%,42%)" />
				<h1>Orne.io</h1>
			</div>
		);
	}

	return <OrneContext.Provider value={client}>{children}</OrneContext.Provider>;
}
