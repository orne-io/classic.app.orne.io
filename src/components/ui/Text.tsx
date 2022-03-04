import { styled } from 'stitches.config';

export const Text = styled('span', {
	color: '$textColor',
	fontVariantNumeric: 'tabular-nums',

	defaultVariants: {
		size: 2,
	},

	variants: {
		color: {
			red: {
				color: 'red',
			},
		},

		size: {
			0: {
				fontSize: '$xs',
			},
			1: {
				fontSize: '$sm',
			},
			2: {
				fontSize: '$base',
			},
			3: {
				fontSize: '$lg',
			},
			4: {
				fontSize: '$xl',
			},
			5: {
				fontSize: '$heading3',
			},
			6: {
				fontSize: '$heading2',
			},
			7: {
				fontSize: '$heading1',
			},
		},
	},
});
