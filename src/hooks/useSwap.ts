import Decimal from 'decimal.js';

export function useSwap() {}

function computeAllowanceMessage(amount: string) {}

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
