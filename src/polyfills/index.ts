import * as buffer from 'buffer';

// @ts-expect-error Ugly Polyfill
import process from './process-es6';

// @ts-expect-error Ugly Polyfill
window.Buffer = buffer.Buffer;

window.process = process;
