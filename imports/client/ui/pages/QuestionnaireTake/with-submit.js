import { withHandlers } from 'recompose'


export default withHandlers({
	onSave: ({ value, questionnaire, setSubmitted }) => () => {
		const questionnaireAnswer = {
			questionnaireId: questionnaire._id,
			questions: value,
		}
		
		fetch('/api/questionnaire-answers/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(questionnaireAnswer),
		}).then(({ ok }) => {
			if(ok) {
				setSubmitted()
			} else {
				throw new Error('Cannot submit questionnaire answers')
			}
		})
	},
})
