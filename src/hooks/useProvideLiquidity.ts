import Decimal from 'decimal.js';
import { useMutation } from 'react-query';
import { Coin, MsgExecuteContract } from '@terra-money/terra.js';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useApp } from 'hooks/useApp';

type ProvideLiquidityParams = {
	amountUst: string;
	amountOrne: string;
};

export function useProvideLiquidity() {
	const connectedWallet = useConnectedWallet();
	const { contractAddress } = useApp();

	const { mutate, status } = useMutation(async (params: ProvideLiquidityParams) => {
		const increaseAllowanceQuery = {
			increase_allowance: {
				amount: new Decimal(params.amountOrne).times(1_000_000).toString(),
				spender: contractAddress.pair,
			},
		};

		const provideLiquidityQuery = {
			provide_liquidity: {
				assets: [
					{
						amount: new Decimal(params.amountOrne).times(1_000_000).toString(),
						info: {
							token: {
								contract_addr: contractAddress.token,
							},
						},
					},
					{
						amount: new Decimal(params.amountUst).times(1_000_000).toString(),
						info: {
							native_token: {
								denom: 'uusd',
							},
						},
					},
				],
				slippage_tolerance: '0.01',
			},
		};

		const increaseAllowanceMsg = new MsgExecuteContract(
			connectedWallet!.walletAddress,
			contractAddress.token,
			increaseAllowanceQuery
		);

		const provideLiquidityMsg = new MsgExecuteContract(
			connectedWallet!.walletAddress,
			contractAddress.pair,
			provideLiquidityQuery,
			[new Coin('uusd', new Decimal(params.amountUst).times(1_000_000))]
		);

		return connectedWallet!.post({
			gasAdjustment: '1.6',
			gasPrices: '0.456uusd',
			feeDenoms: ['uusd'],
			msgs: [increaseAllowanceMsg, provideLiquidityMsg],
		});
	});

	return {
		status,
		provide: mutate,
	};
}