import { Peer, type PeerErrorType } from 'peerjs';
import { customAlphabet } from 'nanoid';
import { writable } from 'svelte/store';
import handleConnection from '../handleConnection';

// export default new Peer(customAlphabet('1234567890abcdef', 10)());

const peerWritable = () => {
	const peerId = localStorage?.getItem('peerId') ?? customAlphabet('1234567890abcdef', 10)();
	const { update, ...peerWritable } = writable(new Peer(peerId));

	const set = (newPeer: Peer) => {
		// get(peerWritable).destroy();
		// peerWritable.set(value);
		update((oldPeer) => {
			console.log({ newId: newPeer.id, oldId: oldPeer.id });

			oldPeer.destroy();
			return newPeer;
		});
	};

	// keep this in case for some reason we need to use update
	// const update = (updater: Updater<Peer>) => {
	// 	peerWritable.update((oldPeer) => {
	// 		oldPeer.destroy();
	// 		return updater(oldPeer);
	// 	});
	// };

	peerWritable.subscribe((peer) => {
		localStorage.setItem('peerId', peer.id);

		const handleError = (error: { type: PeerErrorType }) => {
			if (error.type === 'unavailable-id') {
				console.log('ID is unavailable');

				set(new Peer(customAlphabet('1234567890abcdef', 10)()));
				return;
			}
			console.error(error);
		};

		peer.on('connection', (conn) => handleConnection(conn));
		peer.on('error', handleError as unknown as (error: Error) => void);
	});

	return { ...peerWritable, set };
};

export default peerWritable;
