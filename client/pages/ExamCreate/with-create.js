import { withHandlers } from 'recompose'

import calculateAutoWeight from '../../components/ExamEditForm/calculate-auto-weight'
import transformExamClientToServer from '../../util/transform-exam-client-to-server'
import * as rest from '../../rest/index'


export default withHandlers({
	onSave: ({ setSubmitting, setModified, autoWeight, history }) => value => {
		setSubmitting(true)
		
		const valueWithWeight = autoWeight ? calculateAutoWeight(value) : value
		
		const transformedValue = transformExamClientToServer(valueWithWeight)
		
		rest.post('/api/exams/', transformedValue).then(() => {
			setSubmitting(false)
			setModified(false)
			
			history.push('/list-exams')
		})
	},
})
