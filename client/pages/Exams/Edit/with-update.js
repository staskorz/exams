import { withHandlers } from 'recompose'

import calculateAutoWeight from '../../../components/ExamEditForm/calculate-auto-weight'
import transformExamClientToServer from '../../../util/transform-exam-client-to-server'
import * as rest from '../../../rest/index'


export default withHandlers({
	onSave: ({ history, setSubmitting, setModified, autoWeight, match: { params: { examId } } }) => value => {
		setSubmitting(true)
		
		const valueWithWeight = autoWeight ? calculateAutoWeight(value) : value
		
		const transformedValue = transformExamClientToServer(valueWithWeight)
		
		rest.put('/api/exams/' + examId, transformedValue).then(() => {
			setSubmitting(false)
			setModified(false)
			
			history.push('/exams/list')
		})
	},
})
