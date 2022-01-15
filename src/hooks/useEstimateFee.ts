import { useCallback } from 'react';
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import type { Msg } from '@terra-money/terra.js';

export function useEstimateFee() {
	const lcd = useLCDClient();
	const connectedWallet = useConnectedWallet();

	return useCallback(
		async (msgs: Msg[]) => {
			const accountInfo = await lcd.auth.accountInfo(connectedWallet!.walletAddress);

			return await lcd.tx.estimateFee(
				[
					{
						publicKey: accountInfo.getPublicKey(),
						sequenceNumber: accountInfo.getSequenceNumber(),
					},
				],
				{
					msgs,
					feeDenoms: ['uusd'],
					gasPrices: '0.456uusd',
					gasAdjustment: 1.6,
				}
			);
		},
		[lcd, connectedWallet]
	);
}
