import base64ToUint8Array from 'base64-to-uint8array'


export default formFields => {
	const { questions, ...restFormFields } = formFields
	
	const transformedQuestions = questions.map(({ images, ...restQuestionFields }) => {
		if(images) {
			return {
				...restQuestionFields,
				images: images.map(imageData => {
					if(imageData) {
						const { imageBlob, ...restImageFields } = imageData
						
						return {
							...restImageFields,
							image: base64ToUint8Array(imageBlob.blob),
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
