import type { ReactNode } from 'react';
import { createContext, useMemo } from 'react';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import type { HumanAddr } from 'types';
import { ORNE_CONTRACT_ADDRESS } from 'env';

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
		return <div />;
	}

	return <OrneContext.Provider value={client}>{children}</OrneContext.Provider>;
}
