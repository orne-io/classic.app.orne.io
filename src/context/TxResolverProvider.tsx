import { createContext, useEffect, useState } from 'react';
import { useApp } from '../hooks/useApp';
import type { ReactNode } from 'react';
import type { TxResult } from '@terra-money/wallet-provider';
import { useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';
import { toast } from 'react-hot-toast';
import { Text } from '../components/ui';

type PendingTransaction = {
	tx: TxResult;
	customToastMessage?: string;
	callback?: () => void;
};

export type TxResolverData = {
	pendingTransactions: PendingTransaction[];
	pushTransaction: (msg: PendingTransaction) => void;
};

export const TxResolverContext = createContext({} as TxResolverData);

export function TxResolverProvider({ children }: { children: ReactNode }) {
	const connectedWallet = useConnectedWallet();
	const lcd = useLCDClient();
	const [pendingTransactions, setPendingTransactions] = useState<PendingTransaction[]>([]);

	useEffect(() => {
		for (const { tx, customToastMessage, callback } of pendingTransactions) {
			fetchTransactionStatus(connectedWallet?.network.lcd || lcd.config.URL, tx.result.txhash).then(() => {
				setPendingTransactions((txs) => txs.filter((pendingTx) => pendingTx.tx.result.txhash !== tx.result.txhash));
				callback();
				toast((t) => <Text css={{ fontSize: '16px' }}>{customToastMessage}</Text>);
			});
		}
	}, [pendingTransactions]);

	function pushTransaction(msg: PendingTransaction) {
		setPendingTransactions((txs) => [...txs, msg]);
	}

	return (
		<TxResolverContext.Provider value={{ pendingTransactions, pushTransaction }}>{children}</TxResolverContext.Provider>
	);
}

export function sleep(seconds: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, seconds * 1000);
	});
}

async function fetchTransactionStatus(endpoint: string, txHash: string): Promise<any> {
	const url = `${endpoint}/txs/${txHash}`;
	const response = await fetch(url);

	if (!response.ok) {
		await sleep(2);
		return fetchTransactionStatus(endpoint, txHash);
	}

	return response;
}
