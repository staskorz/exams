import { withHandlers } from 'recompose'

import * as rest from '../../../rest'


export default withHandlers({
	onSave: ({ router, router: { params: { examId } } }) => value => {
		rest.put('/api/exams/' + examId, value).then(() => {
			router.push('/list-exams')
		})
	},
})
