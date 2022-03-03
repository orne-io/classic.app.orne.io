import type { NetworkInfo } from '@terra-money/wallet-provider';
import type { HumanAddr } from 'types';

export const BOMBAY_CONTRACT_ADDRESS = {
	token: 'terra182zp52a95r3qg6lt0njxr7l0ujkfwan5h7t3l6' as HumanAddr,
	pair: 'terra1eqzmr4gcx7vtwgcxvg86ccsaly8xqzwu0wu47u' as HumanAddr,
	lp: 'terra1m29xstn4c45cud3m8e7ktggsgjvsm8p826qkez' as HumanAddr,
};

export const MAINNET_CONTRACT_ADDRESS = {
	token: 'terra1hnezwjqlhzawcrfysczcxs6xqxu2jawn729kkf' as HumanAddr,
	pair: 'terra13yftwgefkggq3u627gphq98s6ufwh9u85h5kmg' as HumanAddr,
	lp: 'terra16zy9g2eym8rghxx95ny60c3dyrwqsfx0ypmu5y' as HumanAddr,
};

export function ORNE_CONTRACT_ADDRESS(network: NetworkInfo) {
	return network.chainID.startsWith('bombay') ? BOMBAY_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS;
}
