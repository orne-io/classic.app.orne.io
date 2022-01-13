import styled from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const Trigger = styled(DropdownMenu.Trigger)`
	align-items: center;
	background-color: var(--darker-green);
	border-radius: var(--rounded);
	color: white;
	display: inline-flex;
	padding: var(--space-1) var(--space-2);
`;

export const Balance = styled.span`
	display: inline-block;
	margin-right: var(--space-3);
`;

export const WalletIcon = styled.img`
	height: 20px;
`;

export const WalletAddress = styled.span`
	align-items: center;
	background-color: white;
	border-radius: var(--rounded);
	color: var(--text-color);
	display: inline-flex;
	gap: var(--space-2);
	padding: var(--space-1) var(--space-3);
`;

export const Content = styled(DropdownMenu.Content)`
	background-color: white;
	border-radius: var(--rounded);
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

	margin-top: var(--space-2);
	padding-block: var(--space-1);
	width: 250px;
`;

export const Item = styled(DropdownMenu.Item)`
	cursor: pointer;
	padding: var(--space-1) var(--space-3);
	user-select: none;
	outline: none;

	&:focus,
	&:hover {
		background-color: var(--light-green);
	}
`;
