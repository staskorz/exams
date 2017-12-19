export default (blob, cb) => {
	const fileReader = new FileReader()
	
	fileReader.onerror = () => {
		cb('Error reading BLOB')
	}
	
	fileReader.onload = function() {
		cb(null, new Uint8Array(this.result))
	}
	
	fileReader.readAsArrayBuffer(blob)
}
