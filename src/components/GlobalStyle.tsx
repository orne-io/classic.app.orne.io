import { globalCss } from 'stitches.config';

/**
 * We are using Josh's CSS Reset.
 * @see https://www.joshwcomeau.com/css/custom-css-reset/
 */
export const globalStyles = globalCss({
	'@font-face': [
		{
			fontFamily: 'Myriad Pro',
			fontWeight: 600,
			src: "url('/fonts/MyriadPro-Bold.woff2') format('woff2')",
		},
		{
			fontFamily: 'Myriad Pro',
			fontWeight: 400,
			src: "url('/fonts/MyriadPro-Regular.woff2') format('woff2')",
		},
	],

	'*, *::before, *::after': {
		boxSizing: 'border-box',
	},

	'*': {
		margin: 0,
	},

	'html, body': {
		backgroundColor: '$backgroundColor',
		color: '$textColor',
		height: '100%',
		scrollbarGutter: 'stable both-edges',
	},

	'body': {
		'fontFamily': '$base',
		'lineHeight': 1.5,
		'-webkit-font-smoothing': 'antialiased',
	},

	'img, picture, video, canvas, svg': {
		display: 'block',
		maxWidth: '100%',
	},

	'body, input, button, select, option': {
		fontFamily: '$base',
		fontSize: '$base',
	},

	'input, button, textarea, select': {
		border: 0,
		font: 'inherit',
	},

	'p, h1, h2, h3, h4, h5, h6': {
		overflowWrap: 'break-word',
	},

	'a': {
		textDecoration: 'none',
	},

	'button': {
		borderWidth: '2px',
		borderRadius: '$rounded',
		cursor: 'pointer',
	},

	'#root': {
		isolation: 'isolate',
	},
});
