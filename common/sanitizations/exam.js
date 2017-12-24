const sanitizeImage = imageObj => {
	if(!imageObj) {
		return
	}
	
	const { height, width, image } = imageObj
	
	return {
		height,
		width,
		image,
	}
}


export default ({ name, published, questions }) => ({
	name,
	published: !!published,
	questions: questions.map(({ answers, images, text, weight }) => ({
		text,
		weight,
		answers: answers.map(({ text, correct }) => ({
			text,
			correct: !!correct,
		})),
		images: images.map(sanitizeImage),
	})),
})
