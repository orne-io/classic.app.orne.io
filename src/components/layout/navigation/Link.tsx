import { Link as RouterLink, useResolvedPath, useMatch } from 'react-router-dom';
import { styled } from 'stitches.config';
import type { LinkProps } from 'react-router-dom';

const StyledLink = styled(RouterLink, {
	'alignItems': 'center',
	'display': 'inline-flex',
	'color': 'inherit',
	'fontSize': '$base',
	'gap': '$2',
	'textDecoration': 'none',

	'&:focus, &:hover': {
		textDecoration: 'revert',
	},

	'variants': {
		active: {
			true: {
				textDecoration: 'revert',
			},
		},
	},
});

export function Link({ children, to, ...props }: LinkProps) {
	const resolved = useResolvedPath(to);
	const match = useMatch({ path: resolved.pathname, end: true });

	return (
		<StyledLink to={to} {...props} active={match !== null}>
			{children}
		</StyledLink>
	);
}
