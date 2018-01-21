import { withHandlers } from 'recompose'

import * as rest from '../../../rest/index'
import { notify } from '../../../components/Notification/index'


export default withHandlers({
	onSetPublished: ({ updateExamsInState, intl: { formatMessage } }) => (examId, published) => {
		rest.put('/api/exams/publish/' + examId, { published }).then(() => {
			updateExamsInState(examId, published)
			
			if(published) {
				notify(formatMessage({ id: 'published' }))
			} else {
				notify(formatMessage({ id: 'unpublished' }))
			}
		}).catch(() => {
			if(published) {
				notify(formatMessage({ id: 'publishingError' }))
			} else {
				notify(formatMessage({ id: 'unpublishingError' }))
			}
		})
	},
})
