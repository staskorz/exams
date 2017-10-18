import { withHandlers } from 'recompose'

import { insert } from '/imports/api/questionnaire-answers/methods'


export default withHandlers({
	onSave: ({ value, questionnaire, router }) => () => {
		const questionnaireAnswer = {
			questionnaireId: questionnaire._id,
			questions: value,
		}
		
		insert.call(questionnaireAnswer, (error, result) => {
			if(error) {
				console.log('insertQuestionnaireAnswers error:', error)
			} else {
				router.push('/list-questionnaires')
			}
		})
	},
})
