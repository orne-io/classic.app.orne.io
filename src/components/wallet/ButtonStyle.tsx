import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { styled } from 'stitches.config';

export const Trigger = styled(DropdownMenu.Trigger, {
	'alignItems': 'center',
	'backgroundColor': '$darkGreen',
	'borderRadius': '$rounded',
	'boxShadow': '$base',
	'color': 'white',
	'display': 'inline-flex',
	'padding': '$1 $2',
	'transition': '.1s all',

	'&:hover, &[data-state="open"]': {
		backgroundColor: '$darkerGreen',
	},
});

export const Balance = styled('span', {
	'display': 'inline-block',
	'marginRight': '$3',
	'@media screen and (max-width: 768px)': {
		fontSize: '1rem',
	},
});

export const WalletIcon = styled('img', {
	height: '20px',
});

export const WalletAddress = styled('span', {
	'alignItems': 'center',
	'backgroundColor': 'white',
	'borderRadius': '$rounded',
	'color': '$textColor',
	'display': 'inline-flex',
	'gap': '$2',
	'padding': '$1 $3',

	'@media screen and (max-width: 768px)': {
		fontSize: '1rem',
	},
});

export const WalletAddressString = styled('span', {
	'@media screen and (max-width: 768px)': {
		display: 'none',
	},
});

export const Content = styled(DropdownMenu.Content, {
	backgroundColor: 'white',
	borderRadius: '$rounded',
	boxShadow: '$lg',
	marginTop: '$2',
	paddingBlock: '$1',
	width: '250px',
});

export const Item = styled(DropdownMenu.Item, {
	'cursor': 'pointer',
	'padding': '$1 $3',
	'userSelect': 'none',
	'outline': 'none',
	'transition': '.1s all',

	'&:focus, &:hover': {
		backgroundColor: '$darkerGreen',
		color: 'white',
	},
});
