import { withHandlers } from 'recompose'

import transformExamClientToServer from '../../util/transform-exam-client-to-server'
import * as rest from '../../rest/index'


export default withHandlers({
	onSave: ({ history, setSubmitting, setModified, match: { params: { examId } } }) => value => {
		setSubmitting(true)
		
		const transformedValue = transformExamClientToServer(value)
		
		rest.put('/api/exams/' + examId, transformedValue).then(() => {
			setSubmitting(false)
			setModified(false)
			
			history.push('/list-exams')
		})
	},
})
