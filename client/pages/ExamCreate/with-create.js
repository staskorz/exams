import { withHandlers } from 'recompose'

import * as rest from '../../rest/index'


export default withHandlers({
	onSave: ({ router }) => value => {
		rest.post('/api/exams/', value).then(() => {
			router.push('/list-exams')
		})
	},
})
