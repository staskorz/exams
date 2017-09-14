const maxTitleChars = 50


const validateTextCreator = maxChars => (formatMessage, value) => {
	if(!value || !value.trim()) {
		return formatMessage({ id: 'required' })
	} else if(value.length > maxChars) {
		return formatMessage({ id: 'maxChars' }, { number: maxChars })
	}
}


const validateTitle = validateTextCreator(maxTitleChars)


export default (value, formatMessage) => {
	const errors = {}
	
	const { questionnaireName, questions } = value
	
	errors.questionnaireName = validateTitle(formatMessage, questionnaireName)
	
	errors.questions = questions.map(({ text, answers }) => ({
		text: !text || !text.trim() ? formatMessage({ id: 'required' }) : null,
		
		answers: answers.map(({ text }) => ({
			text: !text || !text.trim() ? formatMessage({ id: 'required' }) : null,
		})),
	}))
	
	return errors
}
