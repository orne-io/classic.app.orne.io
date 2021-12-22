import { Routes, Route } from 'react-router-dom';
import { useChainOptions } from '@terra-money/wallet-provider';
import { AppProviders } from 'configuration/app';
import { Shell } from 'components/layout/Shell';
import { Home } from 'pages/Home';

export function Application() {
	const chainOptions = useChainOptions();

	return (
		chainOptions && (
			<AppProviders {...chainOptions}>
				<Shell>
					<Routes>
						<Route index element={<Home />} />
					</Routes>
				</Shell>
			</AppProviders>
		)
	);
}
