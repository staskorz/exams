import { compose, withState, withHandlers } from 'recompose'

import * as rest from '../../rest/index'


export default compose(
		withState('submitting', 'setSubmitting', false),
		
		withState('submitError', 'setSubmitError', false),
		
		withState('mark', 'setMark', null),
		
		withHandlers({
			onSave: ({ answers, router: { params: { examId } }, setSubmitting, setSubmitError, setMark }) => () => {
				setSubmitting(true)
				
				rest.post('/api/exam-answers/' + examId, answers).then(({ mark }) => {
					setSubmitting(false)
					setSubmitError(false)
					setMark(mark)
				}).catch(() => {
					setSubmitting(false)
					setSubmitError(true)
				})
			},
		}),
)
