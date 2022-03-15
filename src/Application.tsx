import { Routes, Route } from 'react-router-dom';
import { useChainOptions } from '@terra-money/wallet-provider';
import { AppProviders } from 'configuration/app';
import { Shell } from 'components/layout/Shell';
import { Swap } from 'pages/Swap';
import { Earn } from './pages/Earn';
import { Trees } from './pages/Trees';
import { Triangle } from 'react-loader-spinner';

export function Application() {
	const chainOptions = useChainOptions();

	if (!chainOptions) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					gap: '8px',
				}}
			>
				<Triangle ariaLabel="Loading the dApp" color="hsl(203,23%,42%)" />
				<h1>Orne.io</h1>
			</div>
		);
	}

	return (
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
	);
}
