import { useQuery } from 'react-query';
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { ORNE_QUERY_KEY } from 'client/cacheKeys';
import { useApp } from 'hooks/useApp';

export function useLpBalance() {
	const { contractAddress } = useApp();
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();

	return useQuery([ORNE_QUERY_KEY.ORNE_LP], () => {
		return lcd.wasm
			.contractQuery(contractAddress.lp, { balance: { address: connectedWallet!.walletAddress } })
			.then((response) => response.balance);
	});
}
