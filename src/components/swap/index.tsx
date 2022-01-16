import styled from 'styled-components';

export * from './SwapOrne';
export * from './SwapUst';

export const Error = styled.span`
	color: red;
	font-size: 1rem;
`;

export const SwapSection = styled.form`
	display: grid;
	grid-template-columns: 1fr 70px 1fr;
	grid-template-rows: repeat(2, min-content);
	gap: var(--space-4);
`;

export const Content = styled.section`
	display: contents;
`;

export const InformationCell = styled.td`
	text-align: right;
`;

export const InputBlock = styled.div`
	background-color: var(--light-green);
	border-radius: var(--rounded);
	padding: var(--space-2) var(--space-3);
	grid-row: 1;
`;

export const MetaBlock = styled.div`
	grid-row: 2;

	> table {
		width: 100%;
	}
`;

export const InputWrapper = styled.div`
	display: flex;
	align-items: center;
`;

export const PriceInput = styled.input`
	padding: 0px var(--space-2) 0px 0px;
	width: 100%;
	height: 35px;
	font-size: 2rem;
	color: var(--dark-green);
	border: 0;
	background-color: transparent;

	:focus {
		outline: none;
	}
`;

export const TokenSymbol = styled.div`
	display: flex;
`;

export const InputHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: var(--space-2);

	.balance {
		margin-left: auto;
		margin-right: var(--space-3);
	}

	button {
		display: inline-block;
		line-height: 1.3rem;
		font-size: 1.2rem;
	}
`;

export const MiddlePart = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
	grid-row: 1;
	grid-column: 2;
`;

export const SwapIcon = styled.img`
	height: 45px;
	cursor: pointer;
	transition: 0.2s transform;

	:active {
		transform: scale(0.9);
	}
`;

export const SwapButton = styled.button`
	display-inline: block;
	margin-top: var(--space-4);
	width: 100%;
	font-size: 2rem;
	color: white;
	border-radius: var(--rounded);
	background-color: var(--darker-green);
`;
