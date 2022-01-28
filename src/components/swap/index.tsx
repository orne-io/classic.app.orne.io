import styled from 'styled-components';

export * from './SwapOrne';
export * from './SwapUst';

export const Error = styled.span`
	color: red;
	font-size: 1rem;
`;

export const SwapSection = styled.form`
	display: flex;
	flex-wrap: wrap;
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

export const SwapBottom = styled.div`
	display: flex;
	width: 100%;

	@media screen and (max-width: 768px) {
		flex-direction: column-reverse;
	}
`;

export const Separator = styled.div`
	width: 25%;
`;

export const TxDetails = styled.div`
	padding: 0px var(--space-3);
	width: 100%;

	table {
		width: 100%;

		tr {
			td {
				&:last-of-type {
					text-align: right;
				}
			}
		}
	}

	@media screen and (max-width: 768px) {
		margin-top: var(--space-2);
	}
`;

export const FormControls = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 0px var(--space-3);
	width: 100%;
`;

export const SwapButton = styled.button`
	margin-top: var(--space-4);
	width: 100%;
	font-size: 2rem;
`;
