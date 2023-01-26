import type { DataConnection } from 'peerjs';
import { z } from 'zod';

export const TextMessageSchema = z.object({
	type: z.literal('message'),
	messageType: z.literal('text'),
	id: z.string(),
	text: z.string()
});

export type TextMessage = z.infer<typeof TextMessageSchema>;

export const FileDataSchema = z.object({
	type: z.literal('filedata'),
	id: z.string(),
	file: z.object({
		name: z.string(),
		type: z.string(),
		size: z.number(),
		arrayBuffer: z.instanceof(ArrayBuffer)
	})
});
export type FileData = z.infer<typeof FileDataSchema>;

export const FileMessageSchema = z.object({
	type: z.literal('message'),
	messageType: z.literal('file'),
	id: z.string(),
	file: z.object({
		name: z.string(),
		type: z.string(),
		size: z.number(),
		url: z.string()
	})
});

export type FileMessage = z.infer<typeof FileMessageSchema>;

export type MessageList = (TextMessage | FileMessage)[];

export const ProfileSchema = z.object({
	type: z.literal('profile'),
	// id: z.string(), //TODO: Allow user to reuse their ID
	name: z.string(),
	picture: z.union([z.literal(''), z.string().trim().url()])
});

export type Profile = z.infer<typeof ProfileSchema>;

export type Contact = { conn: DataConnection; profile: Profile; messages: MessageList };
export type ContactMap = Record<string, Contact>;
