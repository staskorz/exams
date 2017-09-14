const maxTitleChars = 50


const validateTitle = (formatMessage, value) => {
	if(!value || !value.trim()) {
		return formatMessage({ id: 'required' })
	} else if(value.length > maxTitleChars) {
		return formatMessage({ id: 'maxChars' }, { number: maxTitleChars })
	}
}


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
