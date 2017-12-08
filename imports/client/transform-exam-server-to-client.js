export default formFields => {
	const { questions, ...restFormFields } = formFields
	
	const transformedQuestions = questions.map(({ images, ...restQuestionFields }) => {
		if(images) {
			return {
				...restQuestionFields,
				images: images.map(imageData => {
					if(imageData) {
						const { image, ...restImageFields } = imageData
						
						return {
							...restImageFields,
							image: Uint8Array.from(image),
						}
					}
				}),
			}
		} else {
			return {
				...restQuestionFields,
				images: [null, null, null, null],
			}
		}
		
	})
	
	return {
		...restFormFields,
		questions: transformedQuestions,
	}
}
