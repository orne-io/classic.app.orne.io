/**
 * Exported from Anchor Code Base.
 *
 * @see https://github.com/Anchor-Protocol/anchor-web-app/tree/master/app/src/%40libs/types
 * @see https://github.com/Anchor-Protocol/anchor-web-app/tree/master/app/src/%40anchor-protocol/types
 */

export type u<T = string> = T & { __micro: true };
export type NoMicro = { __micro?: false };

export type NominalType<T extends string> = { __type: T };

export type HumanAddr = string & NominalType<'HumanAddr'>;

// Gas
export type Gas<T = number> = T & NominalType<'gas'>;

// Native currencies
export type UST<T = string> = T & NominalType<'ust'>;
export type AUD<T = string> = T & NominalType<'aud'>;
export type CAD<T = string> = T & NominalType<'cad'>;
export type CHF<T = string> = T & NominalType<'chf'>;
export type CNY<T = string> = T & NominalType<'cny'>;
export type DKK<T = string> = T & NominalType<'dkk'>;
export type EUR<T = string> = T & NominalType<'eur'>;
export type GBP<T = string> = T & NominalType<'gbp'>;
export type HKD<T = string> = T & NominalType<'hkd'>;
export type IDR<T = string> = T & NominalType<'idr'>;
export type INR<T = string> = T & NominalType<'inr'>;
export type JPY<T = string> = T & NominalType<'jpy'>;
export type KRW<T = string> = T & NominalType<'krw'>;
export type MNT<T = string> = T & NominalType<'mnt'>;
export type NOK<T = string> = T & NominalType<'nok'>;
export type PHP<T = string> = T & NominalType<'php'>;
export type SDR<T = string> = T & NominalType<'sdr'>;
export type SEK<T = string> = T & NominalType<'sek'>;
export type SGD<T = string> = T & NominalType<'sgd'>;
export type THB<T = string> = T & NominalType<'thb'>;
export type KRT<T = string> = T & NominalType<'krt'>;
export type Luna<T = string> = T & NominalType<'luna'>;

// Union currencies
export type NativeToken<T = string> = T &
	NominalType<
		| 'ust'
		| 'aud'
		| 'cad'
		| 'chf'
		| 'cny'
		| 'dkk'
		| 'eur'
		| 'gbp'
		| 'hkd'
		| 'idr'
		| 'inr'
		| 'jpy'
		| 'krw'
		| 'mnt'
		| 'nok'
		| 'php'
		| 'sdr'
		| 'sek'
		| 'sgd'
		| 'thb'
		| 'krt'
		| 'luna'
	>;

// All currencies
export type Token<T = string> = T & NominalType<string>;

export const NATIVE_TOKEN_DENOMS = [
	'uusd',
	'uluna',
	'uaud',
	'ucad',
	'uchf',
	'ucny',
	'udkk',
	'ueur',
	'ugbp',
	'uhkd',
	'uidr',
	'uinr',
	'ujpy',
	'ukrw',
	'umnt',
	'unok',
	'uphp',
	'usdr',
	'usek',
	'usgd',
	'uthb',
	'ukrt',
];

// utility constants
export const NATIVE_TOKEN_ASSET_INFOS = [
	{ native_token: { denom: 'uusd' } },
	{ native_token: { denom: 'uluna' } },
	{ native_token: { denom: 'uaud' } },
	{ native_token: { denom: 'ucad' } },
	{ native_token: { denom: 'uchf' } },
	{ native_token: { denom: 'ucny' } },
	{ native_token: { denom: 'udkk' } },
	{ native_token: { denom: 'ueur' } },
	{ native_token: { denom: 'ugbp' } },
	{ native_token: { denom: 'uhkd' } },
	{ native_token: { denom: 'uidr' } },
	{ native_token: { denom: 'uinr' } },
	{ native_token: { denom: 'ujpy' } },
	{ native_token: { denom: 'ukrw' } },
	{ native_token: { denom: 'umnt' } },
	{ native_token: { denom: 'unok' } },
	{ native_token: { denom: 'uphp' } },
	{ native_token: { denom: 'usdr' } },
	{ native_token: { denom: 'usek' } },
	{ native_token: { denom: 'usgd' } },
	{ native_token: { denom: 'uthb' } },
	{ native_token: { denom: 'ukrt' } },
];

export type NativeDenom =
	| 'uusd'
	| 'uust' // some nebula contract uses denom by uust
	| 'uluna'
	| 'uaud'
	| 'ucad'
	| 'uchf'
	| 'ucny'
	| 'udkk'
	| 'ueur'
	| 'ugbp'
	| 'uhkd'
	| 'uidr'
	| 'uinr'
	| 'ujpy'
	| 'ukrw'
	| 'umnt'
	| 'unok'
	| 'uphp'
	| 'usdr'
	| 'usek'
	| 'usgd'
	| 'uthb'
	| 'ukrt';

export interface NativeBalances {
	uUST: u<UST>;
	uAUD: u<AUD>;
	uCAD: u<CAD>;
	uCHF: u<CHF>;
	uCNY: u<CNY>;
	uDKK: u<DKK>;
	uEUR: u<EUR>;
	uGBP: u<GBP>;
	uHKD: u<HKD>;
	uIDR: u<IDR>;
	uINR: u<INR>;
	uJPY: u<JPY>;
	uKRW: u<KRW>;
	uMNT: u<MNT>;
	uNOK: u<NOK>;
	uPHP: u<PHP>;
	uSDR: u<SDR>;
	uSEK: u<SEK>;
	uSGD: u<SGD>;
	uTHB: u<THB>;
	uKRT: u<KRT>;
	uLuna: u<Luna>;
}

export const EMPTY_NATIVE_BALANCES: NativeBalances = {
	uUST: '0' as u<UST>,
	uAUD: '0' as u<AUD>,
	uCAD: '0' as u<CAD>,
	uCHF: '0' as u<CHF>,
	uCNY: '0' as u<CNY>,
	uDKK: '0' as u<DKK>,
	uEUR: '0' as u<EUR>,
	uGBP: '0' as u<GBP>,
	uHKD: '0' as u<HKD>,
	uIDR: '0' as u<IDR>,
	uINR: '0' as u<INR>,
	uJPY: '0' as u<JPY>,
	uKRW: '0' as u<KRW>,
	uMNT: '0' as u<MNT>,
	uNOK: '0' as u<NOK>,
	uPHP: '0' as u<PHP>,
	uSDR: '0' as u<SDR>,
	uSEK: '0' as u<SEK>,
	uSGD: '0' as u<SGD>,
	uTHB: '0' as u<THB>,
	uKRT: '0' as u<KRT>,
	uLuna: '0' as u<Luna>,
};

// Units
export type Rate<T = string> = T & NominalType<'ratio'>;
export type Percent<T = string> = T & NominalType<'percent'>;
export type Num<T = string> = T & NominalType<'number'>;
export type JSDateTime = number & NominalType<'jsdatetime'>;
export type DateTime = number & NominalType<'datetime'>;
export type ISODateFormat = string & NominalType<'isodateformat'>;
