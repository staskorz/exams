import { withHandlers } from 'recompose'

import * as rest from '../../../rest'
import { notify } from '../../../components/Notification'


export default withHandlers({
	onTagsChange: ({ updateExamTagsInState, intl: { formatMessage } }) => (examId, tags) => {
		rest.put('/api/exams/tags/' + examId, { tags }).then(() => {
			updateExamTagsInState(examId, tags)
		}).catch(() => {
			notify(formatMessage({ id: 'tagsUpdateError' }))
		})
	},
})
