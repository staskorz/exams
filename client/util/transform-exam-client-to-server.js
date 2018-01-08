export default ({ questions, ...rest }) => ({
	...rest,
	questions: questions.map(({ images, ...rest }) => ({
		...rest,
		images: images.map(imageObj => {
			if(!imageObj || !imageObj.image) {
				return null
			}
			
			const { image, ...rest } = imageObj
			
			return {
				image: Array.from(image),
				...rest,
			}
		}),
	})),
})
