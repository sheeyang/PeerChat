import type { DataConnection } from 'peerjs';
import type { Profile, MessageList } from '../schema';

export type Contact = { conn: DataConnection; profile: Profile; messages: MessageList };
export type ContactMap = Record<string, Contact>;
