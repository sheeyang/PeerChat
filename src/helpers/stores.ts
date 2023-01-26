import { writable } from 'svelte/store';
import type { ContactMap, Profile } from './schema';
import { localWritable } from './lib/localWritable';

export const profile = localWritable<Profile>('profile', {
	type: 'profile',
	name: 'Anonymous',
	picture: ''
});

export const contacts = writable<ContactMap>({});
