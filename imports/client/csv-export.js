import { saveAs } from 'file-saver';


export default (filename, contentObj) => {
	const blobContent = JSON.stringify(contentObj);
	
	const blob = new Blob([blobContent], { type: 'text/csv' });
	saveAs(blob, filename);
};
