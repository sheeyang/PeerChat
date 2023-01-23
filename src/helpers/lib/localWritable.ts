import { writable } from 'svelte/store';

export const localWritable = <T>(key: string, value: T) => {
	const data: T = JSON.parse(localStorage?.getItem(key) ?? 'null');

	const store = writable(data ?? value);

	store.subscribe((val) => {
		localStorage?.setItem(key, JSON.stringify(val));
	});

	return store;
};
