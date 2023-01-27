import {
	type TextMessage,
	type FileMessage,
	TextMessageSchema,
	FileDataSchema,
	FileMessageSchema
} from '../schema';
import { contacts } from '$lib/stores';
import parseData from '../general/parseSchema';

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
	const textMessage = parseData(TextMessageSchema, data);
	if (textMessage) {
		contacts.update((contacts) => {
			contacts[id].messages.push(textMessage satisfies TextMessage);
			return contacts;
		});
		return;
	}

	// TODO: let the user decide if he wants to download the file
	// TODO: download the file in chunks so it wont lag the UI when receiving the file
	const fileData = parseData(FileDataSchema, data);
	if (fileData) {
		const reader = new FileReader();

		reader.readAsDataURL(new Blob([new Uint8Array(fileData.file.arrayBuffer)]));
		reader.addEventListener('load', () => {
			const msg: FileMessage | undefined = parseData(FileMessageSchema, {
				type: 'message',
				messageType: 'file',
				id: fileData.id,
				file: {
					name: fileData.file.name,
					type: fileData.file.type,
					size: fileData.file.size,
					url: reader.result as string
				}
			} satisfies FileMessage);

			if (msg) {
				contacts.update((contacts) => {
					contacts[id].messages.push(msg satisfies FileMessage);
					return contacts;
				});
			}
		});
		return;
	}
};

export default handleMessageData;
