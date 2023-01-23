import type { DataConnection } from 'peerjs';
import { ProfileSchema, MessageSchema } from './schema';
import type { z } from 'zod';
import { profile } from './stores';
import { contacts } from '$helpers/stores';

const parseData = <T extends z.ZodRawShape>(schema: z.ZodObject<T>, data: unknown) => {
	try {
		return schema.parse(data);
	} catch {
		/* empty */
	}
};

const handleConnection = (conn: DataConnection) => {
	console.log('conn', conn);

	// setInterval(() => {
	// 	console.log(
	// 		'🚀 ~ file: handleConnection.ts:22 ~ setInterval ~ conn.peerConnection.iceConnectionState',
	// 		conn.peerConnection.iceConnectionState
	// 	);
	// }, 1000);

	conn.on('error', (error) => {
		console.error(error);
	});

	conn.on('data', (data) => {
		console.log('gotdata', data);

		const msg = parseData(MessageSchema, data);
		if (msg) {
			console.log('is msg');

			contacts.update((contacts) => {
				contacts[msg.id].messages.push(msg);
				return contacts;
			});
			return;
		}

		const profile = parseData(ProfileSchema, data);
		if (profile) {
			contacts.update((contacts) => {
				return { ...contacts, [conn.peer]: { conn, profile, messages: [] } };
			});
			return;
		}
	});

	conn.on('open', () => {
		profile.subscribe((profile) => {
			conn.send(profile);
		});
	});

	conn.on('close', () => {
		console.log(conn.peer, ' is closed');
	});
};

export default handleConnection;
