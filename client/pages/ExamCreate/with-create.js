import { withHandlers } from 'recompose'

import transformExamClientToServer from '../../util/transform-exam-client-to-server'
import * as rest from '../../rest/index'


export default withHandlers({
	onSave: ({ setSubmitting, setModified, history }) => value => {
		setSubmitting(true)
		
		const transformedValue = transformExamClientToServer(value)
		
		rest.post('/api/exams/', transformedValue).then(() => {
			setSubmitting(false)
			setModified(false)
			
			history.push('/list-exams')
		})
	},
})
