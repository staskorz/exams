import { withHandlers } from 'recompose'

import { insert } from '/imports/api/questionnaires/methods'


export default withHandlers({
	onSave: ({ value }) => () => {
		console.log('Saving...')
		
		insert.call(value, (error, result) => {
			if(error) {
				console.log('insertQuestionnaire error:', error)
			} else {
				console.log('questionnaire saved successfully')
			}
		})
	},
})
