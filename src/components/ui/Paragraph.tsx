import { forwardRef } from 'react';
import { Text } from './Text';
import type { ComponentProps, ElementRef } from 'react';
import type { CSS, VariantProps } from 'stitches.config';

type ParagraphSizeVariants = '1' | '2' | '3' | '4';
type ParagraphVariants = { size?: ParagraphSizeVariants } & Omit<VariantProps<typeof Text>, 'size'>;
type ParagraphProps = ComponentProps<typeof DEFAULT_TAG> & ParagraphVariants & { css?: CSS; as?: any };
type TextSizeVariants = Pick<VariantProps<typeof Text>, 'size'>;

const DEFAULT_TAG = 'p';

export const Paragraph = forwardRef<ElementRef<typeof DEFAULT_TAG>, ParagraphProps>((props, ref) => {
	const { size = '2', ...textProps } = props;
	const textSize: Record<ParagraphSizeVariants, TextSizeVariants['size']> = {
		1: '1',
		2: '2',
		3: '3',
		4: '4',
	};

	return (
		<Text as={DEFAULT_TAG} {...textProps} ref={ref} size={textSize[size]} css={{ lineHeight: '1.4', ...props.css }} />
	);
});
