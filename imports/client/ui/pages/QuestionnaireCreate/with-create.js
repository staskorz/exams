import { withHandlers } from 'recompose'

import * as rest from '../../../../../client/rest'


export default withHandlers({
	onSave: ({ value, router }) => () => {
		rest.post('/api/questionnaires/', value).then(() => {
			router.push('/list-questionnaires')
		})
	},
})
