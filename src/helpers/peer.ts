import { Peer, type PeerErrorType } from 'peerjs';
import { customAlphabet } from 'nanoid';
import { get, writable } from 'svelte/store';
import handleConnection from './handleConnection';

// export default new Peer(customAlphabet('1234567890abcdef', 10)());

const peer = () => {
	const peerId = localStorage?.getItem('peerId') ?? customAlphabet('1234567890abcdef', 10)();
	const peerWritable = writable(new Peer(peerId));

	const set = (value: Peer) => {
		get(peerWritable).destroy();
		peerWritable.set(value);
	};

	peerWritable.subscribe((peer) => {
		localStorage.setItem('peerId', peer.id);

		peer.on('connection', handleConnection);

		const handleError = (error: { type: PeerErrorType }) => {
			if (error.type === 'unavailable-id') {
				console.log('ID is unavailable');

				set(new Peer(customAlphabet('1234567890abcdef', 10)()));
				return;
			}
			console.error(error);
		};

		peer.on('error', handleError as unknown as (error: Error) => void);
	});

	return { ...peerWritable, set };
};

export default peer();
