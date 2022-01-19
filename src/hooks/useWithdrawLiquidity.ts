import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useApp } from 'hooks/useApp';
import { useMutation } from 'react-query';
import { MsgExecuteContract } from '@terra-money/terra.js';

export function useWithdrawLiquidity() {
	const connectedWallet = useConnectedWallet();
	const { contractAddress } = useApp();

	const { mutate, status } = useMutation(async () => {
		const msg = new MsgExecuteContract(connectedWallet!.walletAddress, contractAddress.lp, {
			send: {
				amount: 'xx',
				contract: contractAddress.pair,
				msg: 'eyJ3aXRoZHJhd19saXF1aWRpdHkiOnt9fQ',
			},
		});

		return connectedWallet!.post({
			gasAdjustment: '1.6',
			gasPrices: '0.456uusd',
			feeDenoms: ['uusd'],
			msgs: [msg],
		});
	});

	return {
		status,
		withdraw: mutate,
	};
}
