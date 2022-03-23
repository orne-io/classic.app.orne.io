import { parse } from '@lukeed/ms';
import { useQuery } from 'react-query';
import { useLCDClient } from '@terra-money/wallet-provider';
import { ORNE_QUERY_KEY } from 'client/cacheKeys';
import { useApp } from 'hooks/useApp';

export function useShare(amount = 0) {
	const { contractAddress } = useApp();
	const lcd = useLCDClient();

	return useQuery(
		[ORNE_QUERY_KEY.ORNE_SHARE, amount],
		() => {
			return lcd.wasm.contractQuery(contractAddress.pair, { share: { amount } }).then((response) => {
				const [orne, ust] = response;

				return { amountOrne: orne.amount, amountUst: ust.amount };
			});
		},
		{
			staleTime: parse('1m')!,
		}
	);
}
