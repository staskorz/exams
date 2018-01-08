export default ({ questions, ...rest }) => ({
	...rest,
	questions: questions.map(({ images, weight, ...rest }) => ({
		...rest,
		weight: parseInt(weight),
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
