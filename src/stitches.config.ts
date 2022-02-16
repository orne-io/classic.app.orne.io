import { createStitches } from '@stitches/react';
import type * as Stitches from '@stitches/react';
export type CSS = Stitches.CSS<typeof config>;
export type { VariantProps } from '@stitches/react';

export const { styled, css, config, globalCss, keyframes } = createStitches({
	theme: {
		colors: {
			backgroundColor: 'hsl(0,0%,97%)',
			textColor: 'hsl(203,23%,42%)',
			lightGreen: 'hsl(168,26%,93%)',
			darkGreen: 'hsl(173,29%,76%)',
			darkerGreen: 'hsl(203,23%,42%)',
		},
		space: {
			0: 0,
			px: '1px',
			1: '4px',
			2: '8px',
			3: '16px',
			4: '24px',
			5: '32px',
			6: '48px',
			7: '64px',
			8: '96px',
			9: '128px',
		},
		fontSizes: {
			xl: '1.8rem',
			lg: '1.5rem',
			base: '1.375rem',
			sm: '1rem',
			xs: '0.8rem',
			heading1: '2.5rem',
			heading2: '2.25rem',
			heading3: '2rem',
		},
		fonts: {
			base: 'Myriad Pro, -apple-system, sans-serif',
		},
		radii: {
			rounded: '5px',
		},
		sizes: {
			maxContainer: '960px',
		},
	},
	media: {
		md: '(min-width: 768px)',
		lg: '(min-width: 992px)',
	},
	utils: {
		m: (value: string) => ({
			margin: value,
		}),
		mt: (value: string) => ({
			marginTop: value,
		}),
		mr: (value: string) => ({
			marginRight: value,
		}),
		mb: (value: string) => ({
			marginBottom: value,
		}),
		ml: (value: string) => ({
			marginLeft: value,
		}),
		mx: (value: string) => ({
			marginInline: value,
		}),
		my: (value: string) => ({
			marginBlock: value,
		}),

		p: (value: string) => ({
			padding: value,
		}),
		pt: (value: string) => ({
			paddingTop: value,
		}),
		pr: (value: string) => ({
			paddingRight: value,
		}),
		pb: (value: string) => ({
			paddingBottom: value,
		}),
		pl: (value: string) => ({
			paddingLeft: value,
		}),
		px: (value: string) => ({
			paddingInline: value,
		}),
		py: (value: string) => ({
			paddingBlock: value,
		}),
	},
});
