import { Routes, Route } from 'react-router-dom';
import { useChainOptions } from '@terra-money/wallet-provider';
import { AppProviders } from 'configuration/app';
import { Shell } from 'components/layout/Shell';
import { Swap } from 'pages/Swap';
import { Earn } from './pages/Earn';
import { Trees } from './pages/Trees';

export function Application() {
	const chainOptions = useChainOptions();

	return (
		chainOptions && (
			<AppProviders {...chainOptions}>
				<Shell>
					<Routes>
						<Route index element={<Swap />} />
						<Route path="/swap" element={<Swap />} />
						<Route path="/earn" element={<Earn />} />
						<Route path="/trees" element={<Trees />} />
					</Routes>
				</Shell>
			</AppProviders>
		)
	);
}
