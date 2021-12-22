import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: 'Myriad Pro';
		src: url('/fonts/MyriadPro-Bold.woff2') format('woff2');
		font-weight: bold;
		font-style: normal;
	}

	@font-face {
		font-family: 'Myriad Pro';
		src: url('/fonts/MyriadPro-Regular.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
	}
	
	/*
	Josh's Custom CSS Reset
	https://www.joshwcomeau.com/css/custom-css-reset/
	*/
	*, *::before, *::after {
		box-sizing: border-box;
	}

	* {
		margin: 0;
	}

	html, body {
		height: 100%;
	}

	body {
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;
	}

	img, picture, video, canvas, svg {
		display: block;
		max-width: 100%;
	}

	input, button, textarea, select {
		font: inherit;
	}

	p, h1, h2, h3, h4, h5, h6 {
		overflow-wrap: break-word;
	}

	#app {
		isolation: isolate;
	}

	// Home-made Reset
	:root {
		--background-color: #f8f8f8;
		--text-color: #537285;
		--light-green: #e7f1ef;
		--dark-green: #afd3cf;

		--container-width: 960px;
		--rounded: 5px;

		--space-0: 0px;
		--space-px: 1px;
		--space-1: 4px;
		--space-2: 8px;
		--space-3: 16px;
		--space-4: 24px;
		--space-5: 32px;
		--space-6: 48px;
		--space-7: 64px;
		--space-8: 96px;
		--space-9: 128px;
	}

	body {
		background-color: var(--background-color);
		color: var(--text-color);
		font-family: 'Myriad Pro', sans-serif;
	}

	button {
		cursor: pointer;
		border: 0;
	}
`;
