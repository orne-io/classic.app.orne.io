import Decimal from 'decimal.js';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toAmount } from '@terra.kitchen/utils';
import { Coin, MsgExecuteContract } from '@terra-money/terra.js';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { ORNE_QUERY_KEY, TERRA_QUERY_KEY } from 'client/cacheKeys';
import { useApp } from 'hooks/useApp';
import { usePendingTransaction } from 'hooks/usePendingTransaction';

type SwapParams = { slippage: string } & (SwapUstParams | SwapOrneParams);
type SwapUstParams = { amountUst: string };
type SwapOrneParams = { amountOrne: string };

export function useSwap() {
	const queryClient = useQueryClient();
	const connectedWallet = useConnectedWallet();
	const computeSwapOrne = useComputeSwapOrneToUstMessage();
	const { pushTransaction } = usePendingTransaction();
	const { contractAddress } = useApp();

	const { mutate, status } = useMutation(async (params: SwapParams) => {
		if ('amountUst' in params) {
			const query = computeSwapUstToOrneMessage(params.amountUst, params.slippage);

			const msg = new MsgExecuteContract(connectedWallet!.walletAddress, contractAddress.pair, query, [
				new Coin('uusd', new Decimal(params.amountUst).times(1_000_000)),
			]);

			const tx = await connectedWallet!.post({
				gasAdjustment: '1.6',
				gasPrices: '0.456uusd',
				feeDenoms: ['uusd'],
				msgs: [msg],
			});

			pushTransaction({
				tx,
				customToastMessage: `Swapped ${toAmount(params.amountUst, { decimals: 0, comma: true })} UST`,
				callback() {
					void queryClient.invalidateQueries(TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES);
					void queryClient.invalidateQueries(ORNE_QUERY_KEY.ORNE_BALANCE);
				},
			});

			return;
		}

		const query = computeSwapOrne(params.amountOrne, params.slippage);

		const msg = new MsgExecuteContract(connectedWallet!.walletAddress, contractAddress.token, query);

		const tx = await connectedWallet!.post({
			gasAdjustment: '1.6',
			gasPrices: '0.456uusd',
			feeDenoms: ['uusd'],
			msgs: [msg],
		});

		pushTransaction({
			tx,
			customToastMessage: `Swapped ${toAmount(params.amountOrne, { decimals: 0, comma: true })} $ORNE`,
			callback() {
				void queryClient.invalidateQueries(TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES);
				void queryClient.invalidateQueries(ORNE_QUERY_KEY.ORNE_BALANCE);
			},
		});

		return;
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
