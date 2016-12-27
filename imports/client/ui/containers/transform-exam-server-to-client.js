export default formFields => {
	const { questions, ...restFormFields } = formFields;
	
	const transformedQuestions = questions.map(({ images, ...restQuestionFields }) => {
		if(images) {
			return {
				...restQuestionFields,
				images: images.map(imageData => {
					if(imageData) {
						const { imageBlob, ...restImageFields } = imageData;
						
						return {
							...restImageFields,
							image: imageBlob.blob
						};
					}
				})
			};
		} else {
			return {
				...restQuestionFields,
			};
		}
		
	});
	
	return {
		...restFormFields,
		questions: transformedQuestions
	};
};
