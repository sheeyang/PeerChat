import { Peer } from 'peerjs';
import { customAlphabet } from 'nanoid';

export default new Peer(customAlphabet('1234567890abcdef', 10)());
