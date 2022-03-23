import { parse } from '@lukeed/ms';
import { useQuery } from 'react-query';
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { ORNE_QUERY_KEY } from 'client/cacheKeys';
import { useApp } from 'hooks/useApp';

export function useLpBalance() {
	const { contractAddress } = useApp();
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();

	return useQuery(
		[ORNE_QUERY_KEY.ORNE_LP, connectedWallet?.walletAddress],
		() => {
			if (!connectedWallet) {
				return;
			}

			return lcd.wasm.contractQuery(contractAddress.astroGenerator, {
				deposit: { lp_token: contractAddress.lp, user: connectedWallet.walletAddress },
			});
		},
		{
			staleTime: parse('1m')!,
		}
	);
}
