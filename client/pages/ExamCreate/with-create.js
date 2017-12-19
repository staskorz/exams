import { withHandlers } from 'recompose'

import * as rest from '../../rest/index'


export default withHandlers({
	onSave: ({ history }) => value => {
		rest.post('/api/exams/', value).then(() => {
			history.push('/list-exams')
		})
	},
})
