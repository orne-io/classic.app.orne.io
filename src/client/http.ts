export function fetcher<Data>(endpoint: string, options?: RequestInit): Promise<Data> {
	return fetch(endpoint, options).then((response) => response.json()); // TODO: Handle Errors
}

export function wasm<Data>(query: Record<string, any>, contractAddress: string, queryClient: QueryClient) {
	const endpoint = `${queryClient.endpoint}/wasm/contracts/${contractAddress}/store?query_msg=${JSON.stringify(query)}`;

	return queryClient.fetcher<LcdResult<Data>>(endpoint);
}

export type LcdResult<Data> = {
	height: string;
	result: Data;
};

export type QueryClient = {
	endpoint: string;
	fetcher: typeof fetcher;
	wasm: typeof wasm;
};
