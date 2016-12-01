export default (canvas, cb) => {
	if(canvas.msToBlob) {
		const blob = canvas.msToBlob();
		
		cb(blob);
	} else {
		canvas.toBlob(blob => {
			cb(blob);
		});
	}
};
