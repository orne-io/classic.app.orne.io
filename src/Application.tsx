import { Routes, Route } from 'react-router-dom';
import { useChainOptions } from '@terra-money/wallet-provider';
import { AppProviders } from 'configuration/app';
import { Header } from 'components/layout/Header';
import { Home } from 'pages/Home';

export function Application() {
	const chainOptions = useChainOptions();

	return (
		chainOptions && (
			<AppProviders {...chainOptions}>
				<Header />

				<Routes>
					<Route index element={<Home />} />
				</Routes>
			</AppProviders>
		)
	);
}
