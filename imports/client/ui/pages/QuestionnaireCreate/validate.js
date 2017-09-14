const maxTitleChars = 50
const maxBodyChars = 500


const validateTextCreator = maxChars => (formatMessage, value) => {
	if(!value || !value.trim()) {
		return formatMessage({ id: 'required' })
	} else if(value.length > maxChars) {
		return formatMessage({ id: 'maxChars' }, { number: maxChars })
	}
}


const validateTitle = validateTextCreator(maxTitleChars)
const validateBody = validateTextCreator(maxBodyChars)


export default (value, formatMessage) => {
	const errors = {}
	
	const { questionnaireName, questions } = value
	
	errors.questionnaireName = validateTitle(formatMessage, questionnaireName)
	
	errors.questions = questions.map(({ text, answers }) => ({
		text: validateBody(formatMessage, text),
		
		answers: answers.map(({ text }) => ({
			text: validateBody(formatMessage, text),
		})),
	}))
	
	return errors
}
