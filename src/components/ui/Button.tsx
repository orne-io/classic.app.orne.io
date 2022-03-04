import { styled } from 'stitches.config';

export const Button = styled('button', {
	'backgroundColor': '$darkGreen',
	'border': '2px solid transparent',
	'color': 'white',
	'cursor': 'pointer',
	'padding': '$1 $3',
	'transition': '.1s all',

	'&:hover': {
		backgroundColor: '$darkerGreen',
	},

	'variants': {
		outline: {
			true: {
				'backgroundColor': 'transparent',
				'borderColor': '$darkGreen',
				'color': '$darkerGreen',

				'&:hover': {
					borderColor: '$darkerGreen',
					backgroundColor: 'transparent',
				},
			},
			dark: {
				'backgroundColor': 'transparent',
				'borderColor': '$darkerGreen',
				'color': '$darkerGreen',

				'&:hover': {
					backgroundColor: '$darkerGreen',
					color: 'white',
				},
			},
		},
		size: {
			small: {
				fontSize: '$sm',
				paddingBlock: 0,
			},
		},
		disabled: {
			true: {
				opacity: '0.5',
				cursor: 'not-allowed',
			},
		},
	},
});
