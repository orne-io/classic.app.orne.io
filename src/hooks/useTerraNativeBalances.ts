import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useApp } from './useApp';
import { useTerraNativeBalancesQuery } from 'client/queries/nativeBalances';
import { EMPTY_NATIVE_BALANCES } from 'types';

export function useTerraNativeBalances() {
	const { queryClient } = useApp();
	const connectedWallet = useConnectedWallet();

	const { data = EMPTY_NATIVE_BALANCES } = useTerraNativeBalancesQuery(connectedWallet!.walletAddress, queryClient);

	return data;
}
