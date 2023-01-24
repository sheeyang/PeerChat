import type { DataConnection } from 'peerjs';
import type { Profile } from './schema';
import { contacts, profile } from './stores';
import handleMessageData from './dataHandlers/handleMessageData';
import handleData from './dataHandlers/handleProfileData';

const handleConnection = (conn: DataConnection) => {
	console.log('conn', conn);

	// check if connection is still open if other methods fail
	conn.peerConnection.onconnectionstatechange = () => {
		// console.log(conn.peerConnection?.connectionState);
		if (conn.peerConnection?.connectionState === 'disconnected') conn.close();
	};

	conn.on('error', (error) => {
		console.error(error);
	});

	conn.on('data', (data) => {
		console.log('got data', data);

		handleData(data, conn);
		handleMessageData(data, conn.peer);
	});

	conn.on('open', () => {
		profile.subscribe((profile) => {
			conn.send(profile satisfies Profile);
		});
	});

	conn.on('close', () => {
		contacts.update((contacts) => {
			delete contacts[conn.peer];
			return contacts;
		});
		console.log(conn.peer, 'closed');
	});
};

export default handleConnection;
