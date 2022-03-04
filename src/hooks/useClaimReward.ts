import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { useApp } from './useApp';
import { useMutation, useQueryClient } from 'react-query';
import { MsgExecuteContract } from '@terra-money/terra.js';
import { ORNE_QUERY_KEY } from '../client/cacheKeys';

export function useClaimReward() {
	const queryClient = useQueryClient();
	const connectedWallet = useConnectedWallet();
	const { contractAddress } = useApp();

	return useMutation(
		() => {
			const msg = new MsgExecuteContract(connectedWallet!.walletAddress, contractAddress.astroGenerator, {
				withdraw: {
					lp_token: contractAddress.lp,
					amount: '0',
				},
			});

			return connectedWallet!.post({
				gasAdjustment: '1.6',
				gasPrices: '0.456uusd',
				feeDenoms: ['uusd'],
				msgs: [msg],
			});
		},
		{
			onSuccess() {
				void queryClient.invalidateQueries(ORNE_QUERY_KEY.ORNE_REWARD);
			},
		}
	);
}
