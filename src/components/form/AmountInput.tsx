import { styled } from 'stitches.config';
import type { ChangeEvent } from 'react';

type Props = {
	name: string;
	value: string | null;
	onChange?: Function;
	placeholder?: string;
	disabled?: boolean;
};

const StyledInput = styled('input', {
	'backgroundColor': 'transparent',
	'color': '$darkerGreen',
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
export function AmountInput({ name, value, onChange, placeholder, disabled }: Props) {
	function handleAmountChange(e: ChangeEvent<HTMLInputElement>) {
		if (regex.test(e.target.value) && onChange) {
			onChange(e.target.value);
		}
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
