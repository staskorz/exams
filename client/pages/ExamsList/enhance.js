import { compose } from 'recompose'
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
		withSetPublished,
		withFilter,
)
