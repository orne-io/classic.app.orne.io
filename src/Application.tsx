import { Routes, Route } from 'react-router-dom';
import { useChainOptions } from '@terra-money/wallet-provider';
import { AppProviders } from 'configuration/app';
import { Home } from 'pages/Home';

export function Application() {
	const chainOptions = useChainOptions();

	return (
		chainOptions && (
			<AppProviders {...chainOptions}>
				<Routes>
					<Route index element={<Home />} />
				</Routes>
			</AppProviders>
		)
	);
}
