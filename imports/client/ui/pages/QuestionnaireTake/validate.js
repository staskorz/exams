const maxChars = 500


const validateTextCreator = (maxChars, required = true) => (formatMessage, value, setErrorsDetected) => {
	if(required && (!value || !value.trim())) {
		setErrorsDetected()
		
		return formatMessage({ id: 'required' })
	} else if(value && value.length > maxChars) {
		setErrorsDetected()
		
		return formatMessage({ id: 'maxChars' }, { number: maxChars })
	}
}


const validateFreeText = validateTextCreator(maxChars)


export default (questions, questionnaire, formatMessage) => {
	let errorsDetected = false
	
	const setErrorsDetected = () => {
		errorsDetected = true
	}
	
	const errors = questions.map((answers, index) => {
		const questionErrors = {}
		
		const countChecked = answers.reduce((acc, { checked }) => (checked ? acc + 1 : acc), 0)
		
		if(countChecked === 0) {
			questionErrors.noneChecked = formatMessage({
				id: questionnaire.questions[index].multipleChoice ? 'mustCheckAtLeastOneAnswer' : 'mustCheckOneAnswer',
			})
			
			setErrorsDetected()
		}
		
		questionErrors.answers = answers.map(({ checked, freeText }) => ({
			freeText: checked ? validateFreeText(formatMessage, freeText, setErrorsDetected) : undefined,
		}))
		
		return questionErrors
	})
	
	return {
		errors,
		errorsDetected,
	}
}
