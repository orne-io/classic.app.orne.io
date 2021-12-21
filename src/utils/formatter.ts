import big, { Big, BigSource } from 'big.js';
import type { NominalType, Token, u } from '../types';

export const MICRO = 1_000_000;

export function demicrofy<T extends Token<BigSource>>(
	amount: u<T>
): T extends NominalType<infer N> ? Big & NominalType<N> : T {
	return big(amount || 0).div(MICRO) as any;
}
