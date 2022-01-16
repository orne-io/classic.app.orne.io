import { PageDescription, PageTitle } from 'components/GlobalStyle';
import { SwapUst } from '../components/swap';

enum SwapDirection {
	UstToOrne,
	OrneToUst,
}

export function Swap() {
	return (
		<article>
			<header>
				<PageTitle>Swap</PageTitle>
				<PageDescription>Instantly trade $ORNE and UST</PageDescription>
			</header>
			<SwapUst />
		</article>
	);
}
