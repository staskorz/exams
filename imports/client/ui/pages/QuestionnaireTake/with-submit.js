import { withHandlers } from 'recompose'

import { insert } from '/imports/api/questionnaire-answers/methods'


export default withHandlers({
	onSave: ({ value, questionnaire, router, setSubmitted }) => () => {
		const questionnaireAnswer = {
			questionnaireId: questionnaire._id,
			questions: value,
		}
		
		insert.call(questionnaireAnswer, (error, result) => {
			if(error) {
				console.log('insertQuestionnaireAnswers error:', error)
			} else {
				setSubmitted()
			}
		})
	},
})
