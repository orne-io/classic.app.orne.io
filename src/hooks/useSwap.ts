import Decimal from 'decimal.js';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { Coin, MsgExecuteContract } from '@terra-money/terra.js';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useApp } from 'hooks/useApp';

type SwapParams = { slippage: string } & (SwapUstParams | SwapOrneParams);
type SwapUstParams = { amountUst: string };
type SwapOrneParams = { amountOrne: string };

export function useSwap() {
	const connectedWallet = useConnectedWallet();
	const computeSwapOrne = useComputeSwapOrneToUstMessage();
	const { contractAddress } = useApp();

	const { mutate, status } = useMutation(async (params: SwapParams) => {
		if ('amountUst' in params) {
			const query = computeSwapUstToOrneMessage(params.amountUst, params.slippage);

			const msg = new MsgExecuteContract(connectedWallet!.walletAddress, contractAddress.pair, query, [
				new Coin('uusd', new Decimal(params.amountUst).times(1_000_000)),
			]);

			return connectedWallet!.post({
				gasAdjustment: '1.6',
				gasPrices: '0.456uusd',
				feeDenoms: ['uusd'],
				msgs: [msg],
			});
		}

		const query = computeSwapOrne(params.amountOrne, params.slippage);

		const msg = new MsgExecuteContract(connectedWallet!.walletAddress, contractAddress.token, query);

		return connectedWallet!.post({
			gasAdjustment: '1.6',
			gasPrices: '0.456uusd',
			feeDenoms: ['uusd'],
			msgs: [msg],
		});
	});

	return {
		status,
		swap: mutate,
	};
}

export function useComputeSwapOrneToUstMessage() {
	const { contractAddress } = useApp();

	return useCallback(
		(amount: string, slippage: string) => {
			return {
				send: {
					amount: new Decimal(amount).times(1_000_000).toString(),
					contract: contractAddress.pair,
					msg: btoa(
						JSON.stringify({
							swap: {
								// belief_price: new Decimal(beliefPrice).dividedBy(1_000_000).toString(),
								max_spread: new Decimal(slippage).dividedBy(100).toString(),
							},
						})
					),
				},
			};
		},
		[contractAddress]
	);
}

export function computeSwapUstToOrneMessage(amount: string, slippage: string) {
	return {
		swap: {
			// belief_price: new Decimal(beliefPrice).dividedBy(1_000_000).toString(),
			max_spread: new Decimal(slippage).dividedBy(100).toString(),
			offer_asset: {
				amount: new Decimal(amount).times(1_000_000).toString(),
				info: {
					native_token: {
						denom: 'uusd',
					},
				},
			},
		},
	};
}
