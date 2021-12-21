// @ts-expect-error Ugly Polyfill
window.global = window;

import('./polyfills').then(() => import('./main'));
