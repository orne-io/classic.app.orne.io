import { focusManager, QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { WalletProvider } from '@terra-money/wallet-provider';
import { globalStyles } from 'components/GlobalStyle';
import { OrneProvider } from 'context/OrneProvider';
import { TxResolverProvider } from 'context/TxResolverProvider';
import type { ReactNode } from 'react';
import type { WalletControllerChainOptions } from '@terra-money/wallet-provider';

patchReactQueryFocusRefetching();

const queryClient = new QueryClient();

type AppProvidersProps = {
	children: ReactNode;
} & WalletControllerChainOptions;

export function AppProviders({ children, walletConnectChainIds, defaultNetwork }: AppProvidersProps) {
	globalStyles();

	return (
		<WalletProvider defaultNetwork={defaultNetwork} walletConnectChainIds={walletConnectChainIds}>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<OrneProvider>
						<TxResolverProvider>{children}</TxResolverProvider>
					</OrneProvider>
				</QueryClientProvider>
			</BrowserRouter>
		</WalletProvider>
	);
}

// @see https://github.com/Anchor-Protocol/anchor-web-app/blob/master/app/src/%40libs/patch-react-query-focus-refetching/index.ts
export function patchReactQueryFocusRefetching(refetchInactiveTime: number = 1000 * 60) {
	focusManager.setEventListener((handleFocus) => {
		let lastInvisibleTime = -1;

		function onVisibilityChange() {
			if (document.hidden) {
				lastInvisibleTime = Date.now();
			} else if (lastInvisibleTime > 0) {
				const t = Date.now() - lastInvisibleTime;
				if (t > refetchInactiveTime) {
					handleFocus(true);
				}
				lastInvisibleTime = -1;
			}
		}

		if (typeof window !== 'undefined' && window.addEventListener) {
			document.addEventListener('visibilitychange', onVisibilityChange, false);
		}

		return () => {
			document.removeEventListener('visibilitychange', onVisibilityChange);
		};
	});
}
