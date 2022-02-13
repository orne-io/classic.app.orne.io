import { forwardRef } from 'react';
import { Text } from './Text';
import type { ComponentProps, ElementRef } from 'react';
import type { CSS, VariantProps } from 'stitches.config';

type HeadingSizeVariants = '1' | '2' | '3';
type HeadingVariants = { size?: HeadingSizeVariants } & Omit<VariantProps<typeof Text>, 'size'>;
type HeadingProps = ComponentProps<typeof DEFAULT_TAG> & HeadingVariants & { css?: CSS; as?: any };
type TextSizeVariants = Pick<VariantProps<typeof Text>, 'size'>;

const DEFAULT_TAG = 'h1';

export const Heading = forwardRef<ElementRef<typeof DEFAULT_TAG>, HeadingProps>((props, ref) => {
	const { size = '1', ...textProps } = props;
	const textSize: Record<HeadingSizeVariants, TextSizeVariants['size']> = {
		1: '7',
		2: '6',
		3: '5',
	};

	return (
		<Text
			as={DEFAULT_TAG}
			{...textProps}
			ref={ref}
			size={textSize[size]}
			css={{ fontVariantNumeric: 'proportional-nums', ...props.css }}
		/>
	);
});
