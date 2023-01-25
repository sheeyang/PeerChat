import handleMessageData from '$helpers/dataHandlers/handleMessageData';
import peer from '$helpers/peer';
import type { Contact, FileData } from '$helpers/schema';

const sendFiles = async (fileList: FileList, contact: Contact) => {
	console.log('sending');
	for (const file of fileList) {
		const fileData: FileData = {
			type: 'filedata',
			id: peer.id,
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
