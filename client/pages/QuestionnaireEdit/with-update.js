import { withHandlers } from 'recompose'

import * as rest from '../../rest/index'


export default withHandlers({
	onSave: ({ value, router, router: { params: { questionnaireId } } }) => () => {
		rest.put('/api/questionnaires/' + questionnaireId, value).then(() => {
			router.push('/list-questionnaires')
		})
	},
})
