import type { DataConnection } from 'peerjs';
import parseSchema from '$lib/general/parseSchema';
import { ProfileSchema } from '$lib/schema';
import { contacts } from '$lib/stores';

/**
 * This function updates the contacts when a peer sends their profile
 *
 * @param data The message data
 * @param conn The connection to the peer
 * @returns
 */
const handleProfileData = (data: unknown, conn: DataConnection) => {
	const profile = parseSchema(ProfileSchema, data);
	if (profile) {
		contacts.update((contacts) => {
			return { ...contacts, [conn.peer]: { conn, profile, messages: [] } };
		});
		return;
	}
};

export default handleProfileData;
