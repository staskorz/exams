import { withHandlers } from 'recompose'

import * as rest from '../../rest/index'


export default withHandlers({
	onSave: ({ history, match: { params: { examId } } }) => value => {
		rest.put('/api/exams/' + examId, value).then(() => {
			history.push('/list-exams')
		})
	},
})
