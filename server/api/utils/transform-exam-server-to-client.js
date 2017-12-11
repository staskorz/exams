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


const transformImages = images => {
	if(!images) {
		return
	}
	
	return images.map(transformImage)
}


export default ({ questions, ...rest }) => ({
	questions: questions.map(({ images, ...rest }) => ({
		images: transformImages(images),
		...rest,
	})),
	
	...rest,
})
