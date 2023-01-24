import { TextMessageSchema, type FileMessage, FileDataSchema, FileMessageSchema } from '../schema';
import { contacts } from '$helpers/stores';
import parseData from '../lib/parseData';

/**
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
		console.log('is msg');

		contacts.update((contacts) => {
			console.log({ id: id, msgId: textMessage.id });
			console.log(contacts);

			contacts[id].messages.push(textMessage);
			return contacts;
		});
		return;
	}

	const fileData = parseData(FileDataSchema, data);
	if (fileData) {
		console.log('isfile');

		const reader = new FileReader();

		reader.readAsDataURL(new Blob([new Uint8Array(fileData.file.arrayBuffer)]));
		reader.addEventListener(
			'load',
			() => {
				console.log(reader.result);

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
				console.log({ msg });

				if (msg) {
					contacts.update((contacts) => {
						console.log({ fileId: fileData });

						contacts[id].messages.push(msg satisfies FileMessage);
						return contacts;
					});
				}
			},
			false
		);
		return;
	}
};

export default handleMessageData;
