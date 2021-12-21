import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react';
import TSConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config
export default defineConfig({
	plugins: [React(), TSConfigPaths()],

	resolve: {
		alias: {
			'@terra-money/terra.js': '@terra-money/terra.js/dist/bundle.js',
			'process': './src/polyfill/process-es6.js',
			'readable-stream': 'vite-compatible-readable-stream/readable-browser.js',
		},
	},

	server: {
		https: {
			cert: process.env.LOCALHOST_HTTPS_CERT,
			key: process.env.LOCALHOST_HTTPS_KEY,
		},
	},
});
