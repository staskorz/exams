import { withHandlers } from 'recompose'


export default withHandlers({
	onSave: ({ router, router: { params: { examId } } }) => value => {
		fetch('/api/exams/' + examId, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(value),
		}).then(({ ok }) => {
			if(ok) {
				router.push('/list-exams')
			} else {
				throw new Error('Cannot update exam')
			}
		})
	},
})
