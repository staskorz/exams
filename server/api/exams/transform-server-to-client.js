const compatImage = blob => {
	if(blob.data) {
		return blob.data
	} else {
		return Array.from(blob.buffer)
	}
}


const transformImage = imageObj => {
	if(!imageObj) {
		return
	}
	
	const { imageBlob, image, ...rest } = imageObj
	
	return {
		image: image || compatImage(imageBlob.blob),
		
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
