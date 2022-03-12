import { Link as RouterLink, useResolvedPath, useMatch } from 'react-router-dom';
import { styled } from 'stitches.config';
import type { LinkProps } from 'react-router-dom';

const StyledLink = styled(RouterLink, {
	'position': 'relative',
	'padding': '0 $2',
	'lineHeight': '1rem',
	'fontSize': '$sm',
	'textDecoration': 'none',
	'textAlign': 'center',
	'color': '$darkerGreen',
	'transition': '0.3s all',

	'&::after': {
		content: '',
		position: 'absolute',
		bottom: '-30px',
		left: '25%',
		right: '25%',
		height: '20px',
		borderRadius: '$rounded',
		backgroundColor: '$darkGreen',
		transition: '0.3s all',
	},

	'variants': {
		active: {
			true: {
				'transform': 'translateY(-2px)',

				'&::after': {
					bottom: '-28px',
				},
			},
		},
	},
});

export function MobileLink({ children, to, ...props }: LinkProps) {
	const resolved = useResolvedPath(to);
	const match = useMatch({ path: resolved.pathname, end: true });

	return (
		<StyledLink to={to} {...props} active={match !== null}>
			{children}
		</StyledLink>
	);
}
