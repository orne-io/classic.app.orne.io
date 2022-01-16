import styled from 'styled-components';

interface Props {
	size?: 'small' | 'large';
	color?: 'white' | 'black';
}

const StyledSvg = styled.svg`
	animation: spin 1s linear infinite;
	color: var(--spinner-color);
	height: var(--spinner-size);
	width: var(--spinner-size);
`;

export function Spinner({ color = 'white', size = 'small' }: Props) {
	const computedSize = size === 'small' ? '24px' : '32px';
	const computedColor = color === 'white' ? '--color-white' : '--color-black';

	return (
		<StyledSvg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			// @ts-ignore
			style={{ '--spinner-color': computedColor, '--spinner-size': computedSize }}
		>
			<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }}></circle>
			<path
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				style={{ opacity: 0.75 }}
			></path>
		</StyledSvg>
	);
}
