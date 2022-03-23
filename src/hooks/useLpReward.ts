import { parse } from '@lukeed/ms';
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { useApp } from './useApp';
import { useQuery } from 'react-query';
import { ORNE_QUERY_KEY } from '../client/cacheKeys';

type PendingTokenQueryResult = {
	pending: string;
	pending_on_proxy: string;
};

export function useLpReward() {
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();
	const { contractAddress } = useApp();

	return useQuery(
		[ORNE_QUERY_KEY.ORNE_REWARD, connectedWallet?.walletAddress],
		() => {
			if (!connectedWallet) {
				return;
			}

			const msg = {
				pending_token: {
					lp_token: contractAddress.lp,
					user: connectedWallet.walletAddress,
				},
			};

			return lcd.wasm.contractQuery<PendingTokenQueryResult>(contractAddress.astroGenerator, msg);
		},
		{
			staleTime: parse('1m')!,
			refetchInterval: parse('5m')!,
		}
	);
}
