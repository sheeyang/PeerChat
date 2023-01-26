import { get } from 'svelte/store';
import handleMessageData from '$lib/dataHandlers/handleMessageData';
import { peer } from '$lib/stores';
import type { FileData } from '$lib/schema';
import type { Contact } from '$lib/interfaces/contact';

const sendFiles = async (fileList: FileList, contact: Contact) => {
	console.log('sending');
	for (const file of fileList) {
		const fileData: FileData = {
			type: 'filedata',
			id: get(peer).id,
			file: {
				name: file.name,
				type: file.type,
				size: file.size,
				arrayBuffer: await file.arrayBuffer()
			}
		};

		contact.conn.send(fileData satisfies FileData);

		handleMessageData(fileData, contact.conn.peer);
	}
};

export default sendFiles;
