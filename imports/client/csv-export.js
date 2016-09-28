import { unparse as jsonToCsv } from 'papaparse';
import { saveAs } from 'file-saver';


export default (filename, contentObj) => {
	const blobContent = jsonToCsv(contentObj);
	
	const blob = new Blob([blobContent], { type: 'text/csv' });
	saveAs(blob, filename);
};
