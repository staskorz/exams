import { compose, withState, withHandlers } from 'recompose'


export default compose(
		withState('submitting', 'setSubmitting', false),
		
		withState('submitError', 'setSubmitError', false),
		
		withState('mark', 'setMark', null),
		
		withHandlers({
			onSave: ({ router: { params: { examId } }, setSubmitting, setSubmitError, setMark }) => value => {
				setSubmitting(true)
				
				fetch('/api/exam-answers/' + examId, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(value),
				}).then(response => {
					if(!response.ok) {
						throw new Error('Could save exam answers')
					}
					
					return response
				}).then(response => response.json()).then(({ mark }) => {
					setSubmitting(false)
					setMark(mark)
				}).catch(() => {
					setSubmitting(false)
					setSubmitError(true)
				})
			},
		}),
)
