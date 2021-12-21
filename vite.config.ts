import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react';
import TSConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config
export default defineConfig({
	plugins: [React(), TSConfigPaths()],

	server: {
		https: {
			cert: process.env.LOCALHOST_HTTPS_CERT,
			key: process.env.LOCALHOST_HTTPS_KEY,
		},
	},
});
