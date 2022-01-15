import { useQuery } from 'react-query';
import { useLCDClient } from '@terra-money/wallet-provider';
import { ORNE_QUERY_KEY } from 'client/cacheKeys';
import { useApp } from 'hooks/useApp';

export function usePool() {
	const lcd = useLCDClient();
	const { contractAddress } = useApp();

	return useQuery(
		[ORNE_QUERY_KEY.ORNE_POOL],
		() => {
			const msg = { pool: {} };

			return lcd.wasm.contractQuery(contractAddress.pair, msg);
		},
		{
			staleTime: 0,
			refetchInterval: 60 * 1000,
		}
	);
}
