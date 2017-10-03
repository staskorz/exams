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


export default (value, formatMessage) => {
	let errorsDetected = false
	
	const setErrorsDetected = () => {
		errorsDetected = true
	}
	
	const errors = value.map(question => {
		const questionErrors = {}
		
		const countChecked = question.reduce((acc, { checked }) => (checked ? acc + 1 : acc), 0)
		
		if(countChecked === 0) {
			questionErrors.noneChecked = formatMessage({ id: 'mustCheckAtLeastOneAnswer' })
			
			setErrorsDetected()
		}
		
		questionErrors.answers = question.map(({ checked, freeText }) => ({
			freeText: checked ? validateFreeText(formatMessage, freeText, setErrorsDetected) : undefined,
		}))
		
		return questionErrors
	})
	
	return {
		errors,
		errorsDetected,
	}
}
