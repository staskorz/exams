export default (value) => {
	const errors = {}
	
	const { questionnaireName, questions } = value
	
	if(!questionnaireName || !questionnaireName.trim()) {
		errors.questionnaireName = 'Cannot be empty'
	}
	
	errors.questions = questions.map(({ text, answers }) => ({
		text: !text || !text.trim() ? 'Cannot be empty' : null,
		
		answers: answers.map(({ text }) => ({
			text: !text || !text.trim() ? 'Cannot be empty' : null,
		})),
	}))
	
	return errors
}
