import Decimal from 'decimal.js';
import { useMutation } from 'react-query';
import { useLCDClient } from '@terra-money/wallet-provider';
import { useApp } from './useApp';

type SwapSimulationParams = UstSwapSimulation | OrneSwapSimulation;
type UstSwapSimulation = { amountUst: string };
type OrneSwapSimulation = { amountOrne: string };

export function useSwapSimulation() {
	const lcd = useLCDClient();
	const { contractAddress } = useApp();

	const { mutateAsync } = useMutation(async (params: SwapSimulationParams) => {
		if ('amountUst' in params) {
			const formattedAmount = new Decimal(params.amountUst).times(1_000_000).toString();

			const query = {
				simulation: {
					offer_asset: {
						amount: formattedAmount,
						info: { native_token: { denom: 'uusd' } },
					},
				},
			};

			return lcd.wasm.contractQuery(contractAddress.pair, query);
		}

		const formattedAmount = new Decimal(params.amountOrne).times(1_000_000).toString();

		const query = {
			simulation: {
				offer_asset: {
					amount: formattedAmount,
					info: { token: { contract_addr: contractAddress.token } },
				},
			},
		};

		return lcd.wasm.contractQuery(contractAddress.pair, query);
	});

	return {
		simulate: mutateAsync,
	};
}
