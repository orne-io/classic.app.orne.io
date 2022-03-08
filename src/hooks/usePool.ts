import { Dec } from '@terra-money/terra.js';
import { useQuery } from 'react-query';
import { useLCDClient } from '@terra-money/wallet-provider';
import { ORNE_QUERY_KEY } from 'client/cacheKeys';
import { useApp } from 'hooks/useApp';
import type { HumanAddr } from 'types';

type CW20AssetInfo = {
	token: { contract_addr: HumanAddr };
};

type NativeAssetInfo = {
	native_token: { denom: string };
};

type Assets = {
	amount: string;
	info: CW20AssetInfo | NativeAssetInfo;
};

type PoolQueryResult = {
	assets: Assets[];
	total_share: string;
};

export function usePool() {
	const lcd = useLCDClient();
	const { contractAddress } = useApp();

	return useQuery(
		[ORNE_QUERY_KEY.ORNE_POOL],
		() => {
			const msg = { pool: {} };

			return lcd.wasm.contractQuery<PoolQueryResult>(contractAddress.pair, msg).then((response) => {
				const orne = response.assets.find((a) => 'token' in a.info);
				const ust = response.assets.find((a) => 'native_token' in a.info);

				return {
					orne_price: new Dec(ust.amount).dividedBy(orne.amount),
					orne: new Dec(orne.amount),
					ust: new Dec(ust.amount),
				};
			});
		},
		{
			staleTime: Infinity,
		}
	);
}
