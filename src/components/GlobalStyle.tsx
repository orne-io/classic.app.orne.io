import styled, { createGlobalStyle } from 'styled-components';

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

	.mt-5 {
		margin-top: var(--space-5);
	}

	article {
		header {
			margin-bottom: var(--space-6);
		}
	}

	#app {
		isolation: isolate;
	}

	// Home-made Reset
	:root {
		--background-color: #f8f8f8;
		--text-color: #537285;
		--light-green: #e7f1ef;
		--darker-green: #afd3cf;
		--dark-green: #537285;
		

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
		font-size: 1.4375rem;
	}

	button {
		padding: var(--space-1) var(--space-3);
		color: white;
		border-width: 2px;
		border-style: solid;
		border-color: transparent;
		border-radius: var(--rounded);
		background-color: var(--darker-green);
		cursor: pointer;
		transition: 0.1s all;

		&.outline {
			color: var(--dark-green);
			border-color: var(--darker-green);
			background-color: transparent;

			:hover {
				border-color: var(--dark-green);
				background-color: transparent;
			}
		}

		&.small {
			padding-top: 0px;
    	padding-bottom: 0px;
    	font-size: 1rem;
		}

		&.outline-dark {
			color: var(--dark-green);
			border-color: var(--dark-green);
			background-color: transparent;
			
			:hover {
				color: white;
				background-color: var(--dark-green);
			}
		}

		:hover {
			background-color: var(--dark-green);
		}
	}

	.buttons-group {
		display: flex;
		width: 100%;

		button {
			width: 100%;
		}

		button:first-child {
			border-right-width: 0px;
			border-top-right-radius: 0px;
			border-bottom-right-radius: 0px;
		}

		button:last-child {
			border-top-left-radius: 0px;
			border-bottom-left-radius: 0px;
		}
	}
	
	input {
		border: 0;
	}
`;

export const PageTitle = styled.h1`
	border-left: 5px solid var(--text-color);
	font-size: 2rem;
	padding-left: var(--space-3);
`;

export const PageDescription = styled.p`
	margin-top: var(--space-3);
`;

export const SectionHeader = styled.div`
	display: flex;
	align-items: center;
	margin-top: var(--space-5);
	width: 100%;

	button {
		margin-left: var(--space-2);
	}
`;

export const TokenIcon = styled.div`
	margin-right: var(--space-2);
	padding: 8px;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	background: white;
`;
