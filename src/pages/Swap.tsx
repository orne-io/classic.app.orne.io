import styled from 'styled-components';

export function Swap() {
	return (
		<article>
			<header>
				<PageTitle>Swap</PageTitle>
				<PageDescription>Instantly trade $ORNE and UST</PageDescription>
			</header>
			<SwapSection>
				<Content>
					<InputBlock>
						<div>
							<span>Balance 103</span>
							<button>MAX</button>
						</div>
						<InputWrapper>
							<input type="text" />
							<span>UST</span>
						</InputWrapper>
					</InputBlock>

					<MetaBlock>
						<table>
							<tbody>
								<tr>
									<td>Price per $ORNE</td>
									<InformationCell>0.03 UST</InformationCell>
								</tr>
								<tr>
									<td>Price Impact</td>
									<InformationCell>+0.30%</InformationCell>
								</tr>
								<tr>
									<td>Minimum Received</td>
									<InformationCell>50 $ORNE</InformationCell>
								</tr>
								<tr>
									<td>Tx Fee</td>
									<InformationCell>0.25151 UST</InformationCell>
								</tr>
							</tbody>
						</table>
					</MetaBlock>
				</Content>

				<MiddlePart>
					<SwapIcon src="/icons/swapping.svg" alt="" />
				</MiddlePart>

				<Content>
					<InputBlock>
						<div>
							<span>Estimated</span>
						</div>
						<InputWrapper>
							<input type="text" disabled />
							<span>ORNE</span>
						</InputWrapper>
					</InputBlock>

					<MetaBlock style={{ gridColumn: 3 }}>
						<label htmlFor="slippage">Slippage</label>
						<div>
							<button>0.5%</button>
							<button>1%</button>
							<button>4%</button>
							<input id="slippage" name="slippage" type="text" />
						</div>

						<button type="submit">Swap</button>
					</MetaBlock>
				</Content>
			</SwapSection>
		</article>
	);
}

const PageTitle = styled.h1`
	border-left: 5px solid var(--text-color);
	font-size: 2rem;
	padding-left: var(--space-3);
`;

const PageDescription = styled.p`
	margin-top: var(--space-3);
`;

const SwapSection = styled.form`
	display: grid;
	grid-template-columns: 1fr 70px 1fr;
	grid-template-rows: repeat(2, min-content);
	gap: var(--space-4);
	margin-top: var(--space-6);
`;

const Content = styled.section`
	display: contents;
`;

const InformationCell = styled.td`
	text-align: right;
`;

const InputBlock = styled.div`
	background-color: var(--light-green);
	border-radius: var(--rounded);
	padding: var(--space-2) var(--space-3);
	grid-row: 1;
`;

const MetaBlock = styled.div`
	grid-row: 2;

	> table {
		width: 100%;
	}
`;

const InputWrapper = styled.div`
	position: relative;

	input {
		border: 0;
		background-color: transparent;
		height: 35px;
		padding: var(--space-1) var(--space-2);
		width: 100%;
	}

	span {
		display: inline-block;
		position: absolute;
		right: var(--space-3);
	}
`;

const MiddlePart = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
	grid-row: 1;
	grid-column: 2;
`;

const SwapIcon = styled.img`
	height: 45px;
`;
