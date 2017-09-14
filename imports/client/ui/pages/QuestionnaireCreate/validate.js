export default (value, formatMessage) => {
	const errors = {}
	
	const { questionnaireName, questions } = value
	
	if(!questionnaireName || !questionnaireName.trim()) {
		errors.questionnaireName = formatMessage({ id: 'required' })
	}
	
	errors.questions = questions.map(({ text, answers }) => ({
		text: !text || !text.trim() ? formatMessage({ id: 'required' }) : null,
		
		answers: answers.map(({ text }) => ({
			text: !text || !text.trim() ? formatMessage({ id: 'required' }) : null,
		})),
	}))
	
	return errors
}
