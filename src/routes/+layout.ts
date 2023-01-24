import { dev } from '$app/environment';

export const ssr = false;
export const csr = true;

// Disable all console output in production
if (!dev) {
	for (const key in console) {
		/*** @ts-expect-error: ***/
		console[key] = () => void 0;
	}
}
