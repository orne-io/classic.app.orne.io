import { BrowserRouter } from 'react-router-dom';
import { WalletProvider } from '@terra-money/wallet-provider';
import { GlobalStyle } from 'components/GlobalStyle';
import { Header } from 'components/layout/Header';
import type { ReactNode } from 'react';
import type { WalletControllerChainOptions } from '@terra-money/wallet-provider';

type AppProvidersProps = {
	children: ReactNode;
} & WalletControllerChainOptions;

export function AppProviders({ children, walletConnectChainIds, defaultNetwork }: AppProvidersProps) {
	return (
		<WalletProvider defaultNetwork={walletConnectChainIds[0]} walletConnectChainIds={walletConnectChainIds}>
			<Header />

			<BrowserRouter>{children}</BrowserRouter>

			<GlobalStyle />
		</WalletProvider>
	);
}
