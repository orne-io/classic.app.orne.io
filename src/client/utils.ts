import type { QueryFunctionContext } from 'react-query';

// @see https://github.com/Anchor-Protocol/anchor-web-app/blob/887f9f16e4c9f7f968a31135c840e2ab5289524b/app/src/%40libs/react-query-utils/index.ts#L3
export function createQueryFn<T extends any[], R>(
	fn: (...args: T) => Promise<R>
): (ctx: QueryFunctionContext<[string, ...T]>) => Promise<R> {
	return ({ queryKey: [, ...args] }) => {
		return fn(...(args as T));
	};
}
