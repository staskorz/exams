import { withHandlers } from 'recompose'


export default withHandlers({
	onSave: ({ router }) => value => {
		fetch('/api/exams/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(value),
		}).then(({ ok }) => {
			if(ok) {
				router.push('/list-exams')
			} else {
				throw new Error('Cannot create exam')
			}
		})
	},
})
