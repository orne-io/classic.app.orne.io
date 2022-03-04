import { useContext } from 'react';
import { TxResolverContext } from 'context/TxResolverProvider';

export function usePendingTransaction() {
	return useContext(TxResolverContext);
}
