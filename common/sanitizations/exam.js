const sanitizeImage = image => {
	if(!image) {
		return
	}
	
	const { height, width, imageBlob } = image
	
	return {
		height,
		width,
		imageBlob: {
			blob: imageBlob.blob,
		},
	}
}


export default ({ name, published, questions }) => ({
	name,
	published,
	questions: questions.map(({ answers, images, text, weight }) => ({
		text,
		weight,
		answers: answers.map(({ text, correct }) => ({
			text,
			correct,
		})),
		images: images.map(sanitizeImage),
	})),
})
