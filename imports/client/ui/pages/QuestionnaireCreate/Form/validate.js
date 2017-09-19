const maxTitleChars = 50
const maxBodyChars = 500


const validateTextCreator = maxChars => (formatMessage, value, setErrorsDetected) => {
	if(!value || !value.trim()) {
		setErrorsDetected()
		
		return formatMessage({ id: 'required' })
	} else if(value.length > maxChars) {
		setErrorsDetected()
		
		return formatMessage({ id: 'maxChars' }, { number: maxChars })
	}
}


const validateTitle = validateTextCreator(maxTitleChars)
const validateBody = validateTextCreator(maxBodyChars)


export default (value, formatMessage) => {
	const errors = {}
	let errorsDetected = false
	
	const setErrorsDetected = () => {
		errorsDetected = true
	}
	
	const { name, questions } = value
	
	errors.name = validateTitle(formatMessage, name, setErrorsDetected)
	
	errors.questions = questions.map(({ text, answers }) => ({
		text: validateBody(formatMessage, text, setErrorsDetected),
		
		answers: answers.map(({ text }) => ({
			text: validateBody(formatMessage, text, setErrorsDetected),
		})),
	}))
	
	return {
		errors,
		errorsDetected,
	}
}
