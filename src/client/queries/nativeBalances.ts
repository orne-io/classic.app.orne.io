import { useQuery } from 'react-query';
import { TERRA_QUERY_KEY } from 'client/cacheKeys';
import { createQueryFn } from 'client/utils';
import type { UseQueryResult } from 'react-query';
import {
	HumanAddr,
	NativeBalances,
	NativeDenom,
	Num,
	u,
	Token,
	EMPTY_NATIVE_BALANCES,
	UST,
	Luna,
	AUD,
	CAD,
	CHF,
	CNY,
	DKK,
	EUR,
	GBP,
	HKD,
	IDR,
	INR,
	JPY,
	KRW,
	MNT,
	NOK,
	PHP,
	SDR,
	SEK,
	SGD,
	THB,
	KRT,
} from 'types';
import type { QueryClient } from 'client/http';

export type LcdBankBalances = {
	height: Num;
	result: { denom: NativeDenom; amount: u<Token> }[];
};

const queryFn = createQueryFn(terraNativeBalancesQuery);

export function useTerraNativeBalancesQuery(
	walletAddress: HumanAddr,
	queryClient: QueryClient
): UseQueryResult<NativeBalances | undefined> {
	return useQuery([TERRA_QUERY_KEY.TERRA_NATIVE_BALANCES, walletAddress, queryClient], queryFn, {
		refetchInterval: !!walletAddress && 1000 * 60 * 5,
		keepPreviousData: true,
		placeholderData: () => EMPTY_NATIVE_BALANCES,
	});
}

export async function terraNativeBalancesQuery(walletAddress: HumanAddr, queryClient: QueryClient) {
	const balances = await queryClient
		.fetcher<LcdBankBalances>(`${queryClient.endpoint}/bank/balances/${walletAddress}`)
		.then(({ result }) => result);

	const result = { ...EMPTY_NATIVE_BALANCES };

	for (const { denom, amount } of balances) {
		switch (denom) {
			case 'uusd':
				result.uUST = amount as u<UST>;
				break;
			case 'uluna':
				result.uLuna = amount as u<Luna>;
				break;
			case 'uaud':
				result.uAUD = amount as u<AUD>;
				break;
			case 'ucad':
				result.uCAD = amount as u<CAD>;
				break;
			case 'uchf':
				result.uCHF = amount as u<CHF>;
				break;
			case 'ucny':
				result.uCNY = amount as u<CNY>;
				break;
			case 'udkk':
				result.uDKK = amount as u<DKK>;
				break;
			case 'ueur':
				result.uEUR = amount as u<EUR>;
				break;
			case 'ugbp':
				result.uGBP = amount as u<GBP>;
				break;
			case 'uhkd':
				result.uHKD = amount as u<HKD>;
				break;
			case 'uidr':
				result.uIDR = amount as u<IDR>;
				break;
			case 'uinr':
				result.uINR = amount as u<INR>;
				break;
			case 'ujpy':
				result.uJPY = amount as u<JPY>;
				break;
			case 'ukrw':
				result.uKRW = amount as u<KRW>;
				break;
			case 'umnt':
				result.uMNT = amount as u<MNT>;
				break;
			case 'unok':
				result.uNOK = amount as u<NOK>;
				break;
			case 'uphp':
				result.uPHP = amount as u<PHP>;
				break;
			case 'usdr':
				result.uSDR = amount as u<SDR>;
				break;
			case 'usek':
				result.uSEK = amount as u<SEK>;
				break;
			case 'usgd':
				result.uSGD = amount as u<SGD>;
				break;
			case 'uthb':
				result.uTHB = amount as u<THB>;
				break;
			case 'ukrt':
				result.uKRT = amount as u<KRT>;
				break;
		}
	}

	return result;
}

export function pickNativeBalance<T extends Token>(denom: NativeDenom, balances: NativeBalances): u<T> {
	switch (denom) {
		case 'uusd':
			return balances.uUST as u<T>;
		case 'uluna':
			return balances.uLuna as u<T>;
		case 'uaud':
			return balances.uAUD as u<T>;
		case 'ucad':
			return balances.uCAD as u<T>;
		case 'uchf':
			return balances.uCHF as u<T>;
		case 'ucny':
			return balances.uCNY as u<T>;
		case 'udkk':
			return balances.uDKK as u<T>;
		case 'ueur':
			return balances.uEUR as u<T>;
		case 'ugbp':
			return balances.uGBP as u<T>;
		case 'uhkd':
			return balances.uHKD as u<T>;
		case 'uidr':
			return balances.uIDR as u<T>;
		case 'uinr':
			return balances.uINR as u<T>;
		case 'ujpy':
			return balances.uJPY as u<T>;
		case 'ukrw':
			return balances.uKRW as u<T>;
		case 'umnt':
			return balances.uMNT as u<T>;
		case 'unok':
			return balances.uNOK as u<T>;
		case 'uphp':
			return balances.uPHP as u<T>;
		case 'usdr':
			return balances.uSDR as u<T>;
		case 'usek':
			return balances.uSEK as u<T>;
		case 'usgd':
			return balances.uSGD as u<T>;
		case 'uthb':
			return balances.uTHB as u<T>;
		case 'ukrt':
			return balances.uKRT as u<T>;
		default:
			return '0' as u<T>;
	}
}
