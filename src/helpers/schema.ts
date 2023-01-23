import type { DataConnection } from 'peerjs';
import { z } from 'zod';

export const MessageSchema = z.object({
	type: z.literal('message'),
	id: z.string(),
	data: z.string()
});

export type Message = z.infer<typeof MessageSchema>;
export type MessageList = Message[];

export const ProfileSchema = z.object({
	type: z.literal('profile'),
	id: z.string(),
	name: z.string(),
	picture: z.union([z.literal(''), z.string().trim().url()])
});

export type Profile = z.infer<typeof ProfileSchema>;

export type Contact = { conn: DataConnection; profile: Profile; messages: MessageList };
export type ContactMap = Record<string, Contact>;
