const maxTitleChars = 50
const maxDescriptionChars = 5000
const maxQuestionBodyChars = 500


const validateTextCreator = (maxChars, required = true) => (formatMessage, value, setErrorsDetected) => {
	if(required && (!value || !value.trim())) {
		setErrorsDetected()
		
		return formatMessage({ id: 'required' })
	} else if(value && value.length > maxChars) {
		setErrorsDetected()
		
		return formatMessage({ id: 'maxChars' }, { number: maxChars })
	}
}


const validateTitle = validateTextCreator(maxTitleChars)
const validateDescription = validateTextCreator(maxDescriptionChars, false)
const validateQuestionBody = validateTextCreator(maxQuestionBodyChars)


export default (value, formatMessage) => {
	const errors = {}
	let errorsDetected = false
	
	const setErrorsDetected = () => {
		errorsDetected = true
	}
	
	const { name, description, questions } = value
	
	errors.name = validateTitle(formatMessage, name, setErrorsDetected)
	
	errors.description = validateDescription(formatMessage, description, setErrorsDetected)
	
	errors.questions = questions.map(({ text, answers }) => ({
		text: validateQuestionBody(formatMessage, text, setErrorsDetected),
		
		answers: answers.map(({ text }) => ({
			text: validateQuestionBody(formatMessage, text, setErrorsDetected),
		})),
	}))
	
	return {
		errors,
		errorsDetected,
	}
}
