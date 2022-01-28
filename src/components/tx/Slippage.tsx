import { useState } from 'react';
import styled from 'styled-components';

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
		<SlippageControl>
			<label htmlFor="slippage">Slippage</label>

			<SlippageSelector>
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
			</SlippageSelector>
		</SlippageControl>
	);
}

const SlippageControl = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	label {
		margin-right: var(--space-2);
	}

	button,
	input[type='text'] {
		width: 25%;
		margin-right: 3px;
		font-size: 1.2rem;
		color: var(--text-color);
		border-radius: var(--rounded);
		border: 2px solid var(--text-color);
		background-color: transparent;

		:focus,
		:hover,
		&[data-active='true'] {
			color: white;
			border-color: var(--darker-green);
			background-color: var(--darker-green);
		}
	}

	button {
		overflow: hidden;
	}

	input[type='text'] {
		margin-right: 0;
		padding: 0 var(--space-1);
		text-align: center;
	}

	@media screen and (max-width: 768px) {
		margin-top: var(--space-2);
	}
`;

const SlippageSelector = styled.div`
	display: flex;
`;
