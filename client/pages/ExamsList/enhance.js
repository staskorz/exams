import { compose, withProps } from 'recompose'
import { injectIntl } from 'react-intl'

import withLoadingIndicator from '../../hocs/with-loading-indicator'

import withExams from './with-exams'
import withUpdateExamsInState from './with-update-exams-in-state'
import withSetPublished from './with-set-published'
import withFilter from './with-filter'


export default compose(
		withExams,
		withLoadingIndicator,
		injectIntl,
		withUpdateExamsInState,
		withProps({
			availableTags: ['tag1', 'tag2'],
		}),
		withSetPublished,
		withFilter,
)
