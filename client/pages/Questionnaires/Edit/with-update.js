import { withHandlers } from 'recompose'

import * as rest from '../../../rest/index'


export default withHandlers({
	onSave: ({ value, history, match: { params: { questionnaireId } } }) => () => {
		rest.put('/api/questionnaires/' + questionnaireId, value).then(() => {
			history.push('/questionnaires/list')
		})
	},
})
