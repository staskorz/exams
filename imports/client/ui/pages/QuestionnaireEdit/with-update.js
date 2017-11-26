import { withHandlers } from 'recompose'


export default withHandlers({
	onSave: ({ value, router, router: { params: { questionnaireId } } }) => () => {
		fetch('/api/questionnaires/' + questionnaireId, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(value),
		}).then(({ ok }) => {
			if(ok) {
				router.push('/list-questionnaires')
			} else {
				throw new Error('Cannot update questionnaire')
			}
		})
	},
})
