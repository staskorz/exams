const transformImage = imageObj => {
	if(!imageObj) {
		return
	}
	
	const { imageBlob, image, ...rest } = imageObj
	
	return {
		image: image || imageBlob.blob.data,
		
		...rest,
	}
}


export default ({ questions, ...rest }) => ({
	questions: questions.map(({ images, ...rest }) => ({
		images: images.map(transformImage),
		...rest,
	})),
	
	...rest,
})
