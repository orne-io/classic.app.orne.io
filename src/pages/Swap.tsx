import { PageDescription, PageTitle } from 'components/GlobalStyle';
import { SwapUst, SwapOrne } from '../components/swap';
import { useState } from 'react';

enum SwapDirection {
	UstToOrne,
	OrneToUst,
}

export function Swap() {
	const [swapDirection, setSwapDirection] = useState<SwapDirection>(SwapDirection.UstToOrne);

	return (
		<article>
			<header>
				<PageTitle>Swap</PageTitle>
				<PageDescription>Instantly trade $ORNE and UST</PageDescription>
			</header>

			{swapDirection === SwapDirection.UstToOrne ? (
				<SwapUst onChangeDirection={() => setSwapDirection(SwapDirection.OrneToUst)} />
			) : (
				<SwapOrne onChangeDirection={() => setSwapDirection(SwapDirection.UstToOrne)} />
			)}
		</article>
	);
}
