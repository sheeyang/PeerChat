import {
	type TextMessage,
	type FileMessage,
	TextMessageSchema,
	FileDataSchema,
	FileMessageSchema
} from '../schema';
import { contacts } from '$lib/stores';
import parseSchema from '../general/parseSchema';

/**
 * This function adds incoming message to the contacts messages list
 *
 * This function is run when the client sends the message,
 * and when the PeerJS connection receives a message.
 *
 * @param data The message data
 * @param id ID of the contact to put this message into
 * @returns
 */
const handleMessageData = (data: unknown, id: string) => {
	const textMessage = parseSchema(TextMessageSchema, data);
	if (textMessage) {
		contacts.update((contacts) => {
			contacts[id].messages.push(textMessage satisfies TextMessage);
			return contacts;
		});
		return;
	}

	// TODO: let the user decide if he wants to download the file
	// TODO: download the file in chunks so user can send message while to file is uploading
	const fileData = parseSchema(FileDataSchema, data);
	if (fileData) {
		const msg: FileMessage | undefined = parseSchema(FileMessageSchema, {
			type: 'message',
			messageType: 'file',
			id: fileData.id,
			file: {
				name: fileData.file.name,
				type: fileData.file.type,
				size: fileData.file.size,
				url: URL.createObjectURL(new Blob([fileData.file.arrayBuffer]))
			}
		} satisfies FileMessage);

		if (msg) {
			contacts.update((contacts) => {
				contacts[id].messages.push(msg satisfies FileMessage);
				return contacts;
			});
		}
		return;
	}
};

export default handleMessageData;
