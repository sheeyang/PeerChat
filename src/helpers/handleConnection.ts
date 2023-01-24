import type { DataConnection } from 'peerjs';
import type { Profile } from './schema';
import { profile } from './stores';
import handleMessageData from './dataHandlers/handleMessageData';
import handleData from './dataHandlers/handleProfileData';

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

		handleData(data, conn);
		handleMessageData(data, conn.peer);
	});

	conn.on('open', () => {
		profile.subscribe((profile) => {
			conn.send(profile satisfies Profile);
		});
	});

	conn.on('close', () => {
		console.log(conn.peer, ' is closed');
	});
};

export default handleConnection;
