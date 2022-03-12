import { ThreeDots } from 'react-loader-spinner';
import { styled } from 'stitches.config';
import { Flex } from 'components/ui';
import type { ChangeEvent } from 'react';

type Props = {
	name: string;
	value: string | null;
	onChange?: Function;
	placeholder?: string;
	disabled?: boolean;
	loading?: boolean;
};

const StyledInput = styled('input', {
	'backgroundColor': 'transparent',
	'color': '$darkerGreen',
	'minWidth': '0',
	'height': '35px',
	'fontSize': '$xl',

	'&::placeholder': {
		opacity: 0.5,
	},

	'&:focus': {
		outline: 'none',
	},
});

const regex = /^[0-9.]*$/;
export function AmountInput({ name, value, onChange, placeholder, loading, disabled }: Props) {
	loading = loading ?? true;

	function handleAmountChange(e: ChangeEvent<HTMLInputElement>) {
		if (regex.test(e.target.value) && onChange) {
			onChange(e.target.value);
		}
	}

	if (loading) {
		return (
			<Flex align="center">
				<ThreeDots color="hsl(203,23%,42%)" height="10" />
			</Flex>
		);
	}
	return (
		<StyledInput
			id={name}
			name={name}
			value={value || ''}
			onChange={handleAmountChange}
			placeholder={placeholder}
			disabled={disabled}
		/>
	);
}
