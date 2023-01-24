import parseData from '$helpers/lib/parseData';
import { ProfileSchema } from '$helpers/schema';
import { contacts } from '$helpers/stores';
import type { DataConnection } from 'peerjs';

const handleData = (data: unknown, conn: DataConnection) => {
	const profile = parseData(ProfileSchema, data);
	if (profile) {
		contacts.update((contacts) => {
			return { ...contacts, [conn.peer]: { conn, profile, messages: [] } };
		});
		return;
	}
};

export default handleData;
