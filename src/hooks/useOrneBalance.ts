import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useQuery } from 'react-query';
import { useApp } from './useApp';
import { ORNE_QUERY_KEY } from '../client/cacheKeys';

export function useOrneBalance() {
	const { queryClient, contractAddress } = useApp();
	const connectedWallet = useConnectedWallet();

	return useQuery([ORNE_QUERY_KEY.ORNE_BALANCE], async () => {
		const msg = { balance: { address: connectedWallet!.terraAddress } };

		const result = await queryClient.fetcher(
			`${queryClient.endpoint}/terra/wasm/v1beta1/contracts/${contractAddress.token}/store?query_msg=${btoa(
				JSON.stringify(msg)
			)}`
		);

		return result.query_result;
	});
}
