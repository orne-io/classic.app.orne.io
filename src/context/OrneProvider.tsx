import type { ReactNode } from 'react';
import { createContext, useMemo } from 'react';
import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import type { QueryClient } from 'client/http';
import { fetcher, wasm } from 'client/http';
import type { HumanAddr } from 'types';
import { ORNE_CONTRACT_ADDRESS } from 'env';

export type OrneContextData = {
	queryClient: QueryClient;
	contractAddress: Record<string, HumanAddr>;
};

export const OrneContext = createContext<OrneContextData>({} as OrneContextData);

export function OrneProvider({ children }: { children: ReactNode }) {
	const { network, status } = useWallet();

	const client = useMemo(
		() => ({
			queryClient: { fetcher, wasm, endpoint: network.lcd },
			contractAddress: ORNE_CONTRACT_ADDRESS(network),
		}),
		[fetcher, wasm, network]
	);

	if (status === WalletStatus.INITIALIZING) {
		return <div />;
	}

	return <OrneContext.Provider value={client}>{children}</OrneContext.Provider>;
}
