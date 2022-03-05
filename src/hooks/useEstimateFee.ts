import Decimal from 'decimal.js';
import { useMutation } from 'react-query';
import { Coin, MsgExecuteContract } from '@terra-money/terra.js';
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { useApp } from 'hooks/useApp';
import { computeSwapUstToOrneMessage } from 'hooks/useSwap';

type SwapParams = { slippage: string } & (SwapUstParams | SwapOrneParams);
type SwapUstParams = { amountUst: string };
type SwapOrneParams = { amountOrne: string };

export function useEstimateFee() {
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();
	const { contractAddress } = useApp();

	const { mutateAsync } = useMutation(async (params: SwapParams) => {
		if (!connectedWallet) {
			return;
		}

		if ('amountUst' in params) {
			const query = computeSwapUstToOrneMessage(params.amountUst, params.slippage);

			const msg = new MsgExecuteContract(connectedWallet!.walletAddress, contractAddress.pair, query, [
				new Coin('uusd', new Decimal(params.amountUst).times(1_000_000)),
			]);

			const accountInfo = await lcd.auth.accountInfo(connectedWallet!.walletAddress);

			return lcd.tx.estimateFee(
				[
					{
						publicKey: accountInfo.getPublicKey(),
						sequenceNumber: accountInfo.getSequenceNumber(),
					},
				],
				{
					msgs: [msg],
					feeDenoms: ['uusd'],
					gasPrices: '0.456uusd',
					gasAdjustment: 1.6,
				}
			);
		}
	});

	return {
		estimate: mutateAsync,
	};
}
