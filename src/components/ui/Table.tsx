import { styled } from 'stitches.config';

export const Table = styled('table', {
	width: '100%',

	variants: {
		values: {
			true: {
				'tr > td:nth-child(2)': {
					textAlign: 'right',
				},
			},
		},
	},
});
