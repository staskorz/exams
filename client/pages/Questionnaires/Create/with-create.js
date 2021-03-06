import { withHandlers } from 'recompose'

import * as rest from '../../../rest'


export default withHandlers({
	onSave: ({ value, history }) => () => {
		rest.post('/api/questionnaires/', value).then(() => {
			history.push('/questionnaires/list')
		})
	},
})
