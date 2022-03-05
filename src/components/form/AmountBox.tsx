import { readAmount } from '@terra.kitchen/utils';
import { TokenIcon, TokenPair } from 'components/tokens';
import { Box, Button, Flex, Text } from 'components/ui';
import { AmountInput } from './AmountInput';
import { ThreeDots } from 'react-loader-spinner';

type Props = {
	label?: string;
	balance?: string | number;
	denom: string;
	value: string | null;
	onChange?: Function;
	loading?: boolean;
	loadingBalance?: boolean;
	hasMax?: boolean;
	disabled?: boolean;
};

export function AmountBox({
	label,
	balance,
	denom,
	value,
	onChange,
	hasMax,
	disabled,
	loading,
	loadingBalance,
}: Props) {
	label = label ?? 'Balance';
	hasMax = hasMax || false;
	disabled = disabled || false;
	loading = loading ?? false;
	loadingBalance = loadingBalance ?? false;

	function setMaximumAmount() {
		if (onChange) {
			onChange(readAmount(balance));
		}
	}

	return (
		<Flex
			gap={2}
			direction="column"
			css={{ backgroundColor: '$lightGreen', borderRadius: '$rounded', p: '$2 $3', width: '100%' }}
		>
			<Flex justify="between">
				<Text>{label}</Text>
				{loadingBalance !== undefined && (
					<Flex gap={2}>
						{loadingBalance ? (
							<Flex align="center">
								<ThreeDots color="hsl(203,23%,42%)" height="10" />
							</Flex>
						) : (
							<Text>{readAmount(balance, { comma: true })}</Text>
						)}
						{hasMax && (
							<Button type="button" size="small" outline onClick={setMaximumAmount}>
								Max
							</Button>
						)}
					</Flex>
				)}
			</Flex>
			<Flex justify="between">
				<AmountInput
					name={denom}
					placeholder="0.00"
					value={value}
					onChange={onChange}
					loading={loading}
					disabled={disabled}
				/>

				<Flex gap={2}>
					{denom.toLowerCase() === 'lp' ? (
						<>
							<TokenPair>
								<TokenIcon>
									<img src="/images/orne-logo.svg" alt="Orne" />
								</TokenIcon>
								<TokenIcon>
									<img src="/icons/ust.svg" alt="UST" />
								</TokenIcon>
							</TokenPair>
						</>
					) : (
						<TokenIcon>
							{denom.toLowerCase() === 'ust' && <img src="/icons/ust.svg" alt="" />}
							{denom.toLowerCase() === 'orne' && <img src="/images/orne-logo.svg" alt="" />}
						</TokenIcon>
					)}
					<Text>{denom}</Text>
				</Flex>
			</Flex>
		</Flex>
	);
}
