import { TokenIcon } from 'components/GlobalStyle';
import styled from 'styled-components';

export const InputTokenWrapper = styled.div`
	display: flex;
	margin-top: var(--space-3);
	margin-bottom: var(--space-3);
	width: 100%;
`;

export const InputTokenHeader = styled.div`
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

export const TokenSymbol = styled.div`
	display: flex;
	align-items: center;
`;

export const PairSymbol = styled(TokenSymbol)`
	${TokenIcon}:first-of-type {
		margin-right: -6px;
	}
`;

export const InputToken = styled.div`
	padding: var(--space-2) var(--space-3);
	width: 100%;
	border-radius: var(--rounded);
	background-color: var(--light-green);
`;

export const Balance = styled.div``;

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

export const InputTokenSeparator = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 25%;
`;

export const InputTokenSeparatorIcon = styled.div`
	padding: 8px;
	width: 42px;
	height: 42px;
	border-radius: 50%;
	background-color: white;
`;
