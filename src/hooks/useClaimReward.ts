import { useMutation, useQueryClient } from 'react-query';
import { MsgExecuteContract } from '@terra-money/terra.js';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useApp } from 'hooks/useApp';
import { ORNE_QUERY_KEY } from 'client/cacheKeys';
import { usePendingTransaction } from 'hooks/usePendingTransaction';

export function useClaimReward() {
	const queryClient = useQueryClient();
	const connectedWallet = useConnectedWallet();
	const { pushTransaction } = usePendingTransaction();
	const { contractAddress } = useApp();

	return useMutation(async () => {
		const msg = new MsgExecuteContract(connectedWallet!.walletAddress, contractAddress.astroGenerator, {
			withdraw: {
				lp_token: contractAddress.lp,
				amount: '0',
			},
		});

		const tx = await connectedWallet!.post({
			gasAdjustment: '1.6',
			gasPrices: '0.456uusd',
			feeDenoms: ['uusd'],
			msgs: [msg],
		});

		pushTransaction({
			tx,
			callback() {
				void queryClient.invalidateQueries(ORNE_QUERY_KEY.ORNE_BALANCE);
				void queryClient.invalidateQueries(ORNE_QUERY_KEY.ORNE_REWARD);
			},
		});
	});
}
