import { withHandlers } from 'recompose'


export default withHandlers({
	onSave: ({ value, router }) => () => {
		fetch('/api/questionnaires/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(value),
		}).then(({ ok }) => {
			if(ok) {
				router.push('/list-questionnaires')
			} else {
				throw new Error('Cannot create questionnaire')
			}
		})
	},
})
