import { useState } from 'react';
import { styled } from 'stitches.config';
import { Flex } from 'components/ui';

type Props = {
	slippage: number;
	onSlippageChange: (slippage: number) => void;
};

const regex = /^[0-9.]*$/;

export function Slippage({ slippage, onSlippageChange }: Props) {
	const [isCustomAmount, setIsCustomAmount] = useState(false);

	function handleSlippageChange(slippage: number, isCustom = false) {
		if (regex.test(slippage.toString())) {
			setIsCustomAmount(isCustom);
			onSlippageChange(slippage);
		}
	}

	return (
		<SlippageControl align="center" justify="between">
			<label htmlFor="slippage">Slippage</label>

			<Flex gap={2}>
				<button
					type="button"
					onClick={() => handleSlippageChange(0.5)}
					data-active={(!isCustomAmount && slippage === 0.5) || null}
				>
					0.5%
				</button>
				<button
					type="button"
					onClick={() => handleSlippageChange(1)}
					data-active={(!isCustomAmount && slippage === 1) || null}
				>
					1%
				</button>
				<button
					type="button"
					onClick={() => handleSlippageChange(4)}
					data-active={(!isCustomAmount && slippage === 4) || null}
				>
					4%
				</button>
				<input
					id="slippage"
					name="slippage"
					type="text"
					autoComplete="off"
					value={(isCustomAmount && slippage.toString()) || ''}
					onChange={(e) => handleSlippageChange(+e.target.value, true)}
					data-active={isCustomAmount || null}
				/>
			</Flex>
		</SlippageControl>
	);
}

const SlippageControl = styled(Flex, {
	'marginTop': '$2',

	'label': {
		marginRight: '$2',
	},

	"button, input[type='text']": {
		'width': '25%',
		'marginRight': '3px',
		'fontSize': '1.2rem',
		'color': '$textColor',
		'borderRadius': '$rounded',
		'border': '2px solid $textColor',
		'backgroundColor': 'transparent',

		"&:focus, &:hover, &[data-active='true']": {
			color: 'white',
			borderColor: '$darkGreen',
			backgroundColor: '$darkGreen',
		},
	},

	'button': {
		overflow: 'hidden',
	},

	"input[type='text']": {
		marginRight: 0,
		padding: '0 $1',
		textAlign: 'center',
	},
});
