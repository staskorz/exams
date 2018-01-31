import { withHandlers } from 'recompose'

import * as rest from '../../../rest'


export default withHandlers({
	onSave: ({ value, questionnaire, setSubmitted }) => () => {
		const questionnaireAnswer = {
			questionnaireId: questionnaire._id,
			questions: value,
		}
		
		rest.post('/api/questionnaire-answers/', questionnaireAnswer).then(() => {
			setSubmitted()
		})
	},
})
