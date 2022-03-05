import { parse } from '@lukeed/ms';
import { useQuery } from 'react-query';
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { useApp } from 'hooks/useApp';
import { ORNE_QUERY_KEY } from 'client/cacheKeys';

type BalanceQueryResult = {
	balance: string;
};

export function useOrneBalance() {
	const { contractAddress } = useApp();
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();

	return useQuery(
		[ORNE_QUERY_KEY.ORNE_BALANCE],
		async () => {
			return lcd.wasm
				.contractQuery<BalanceQueryResult>(contractAddress.token, {
					balance: { address: connectedWallet!.terraAddress },
				})
				.then((response) => response.balance);
		},
		{
			staleTime: parse('1m')!,
		}
	);
}
