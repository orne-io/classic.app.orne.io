import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useApp } from 'hooks/useApp';
import { useMutation } from 'react-query';
import { MsgExecuteContract } from '@terra-money/terra.js';
import Decimal from 'decimal.js';

type WithdrawLiquidityParams = {
	amount: string;
};

export function useWithdrawLiquidity() {
	const connectedWallet = useConnectedWallet();
	const { contractAddress } = useApp();

	const { mutate, status } = useMutation(async (params: WithdrawLiquidityParams) => {
		const unstakeMsg = new MsgExecuteContract(connectedWallet!.walletAddress, contractAddress.astroGenerator, {
			withdraw: {
				lp_token: contractAddress.lp,
				amount: new Decimal(params.amount).times(1_000_000).toString(),
			},
		});

		const withdrawMsg = new MsgExecuteContract(connectedWallet!.walletAddress, contractAddress.lp, {
			send: {
				amount: new Decimal(params.amount).times(1_000_000).toString(),
				contract: contractAddress.pair,
				msg: 'eyJ3aXRoZHJhd19saXF1aWRpdHkiOnt9fQ',
			},
		});

		return connectedWallet!.post({
			gasAdjustment: '1.6',
			gasPrices: '0.456uusd',
			feeDenoms: ['uusd'],
			msgs: [unstakeMsg, withdrawMsg],
		});
	});

	return {
		status,
		withdraw: mutate,
	};
}
