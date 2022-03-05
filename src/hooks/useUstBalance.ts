import { parse } from '@lukeed/ms';
import { useQuery } from 'react-query';
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { TERRA_QUERY_KEY } from 'client/cacheKeys';

export function useUstBalance() {
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();

	return useQuery(
		[TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES],
		() => {
			return lcd.bank.balance(connectedWallet!.walletAddress).then(([coins]) => coins.get('uusd')?.amount.toString());
		},
		{
			staleTime: parse('1m')!,
		}
	);
}
