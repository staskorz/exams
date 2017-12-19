import { withHandlers } from 'recompose'

import * as rest from '../../../../../client/rest'


export default withHandlers({
	onSave: ({ router }) => value => {
		rest.post('/api/exams/', value).then(() => {
			router.push('/list-exams')
		})
	},
})
