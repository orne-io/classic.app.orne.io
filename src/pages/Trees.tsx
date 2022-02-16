import { Grid, Heading, Paragraph } from 'components/ui';

export function Trees() {
	return (
		<Grid gap={2}>
			<Grid as="header" gap={2}>
				<Heading css={{ borderLeft: '5px solid $textColor', pl: '$3' }}>Trees</Heading>
				<Paragraph>Coming Soon</Paragraph>
			</Grid>
		</Grid>
	);
}
