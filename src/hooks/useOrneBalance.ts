import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { useQuery } from 'react-query';
import { useApp } from 'hooks/useApp';
import { ORNE_QUERY_KEY } from 'client/cacheKeys';

export function useOrneBalance() {
	const { contractAddress } = useApp();
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();

	return useQuery([ORNE_QUERY_KEY.ORNE_BALANCE], async () => {
		const msg = { balance: { address: connectedWallet!.terraAddress } };

		const result = await lcd.wasm.contractQuery(contractAddress.token, msg);

		return result.query_result;
	});
}
