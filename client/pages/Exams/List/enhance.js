import { compose } from 'recompose'
import { injectIntl } from 'react-intl'

import withLoadingIndicator from '../../../hocs/with-loading-indicator'

import withExams from './with-exams'
import withUpdateExamsInState from './with-update-exams-in-state'
import withAvailableTags from './with-available-tags'
import withSetPublished from './with-set-published'
import withSetTags from './with-set-tags'
import withFilter from './with-filter'
import withTagsFilter from './with-tags-filter'


export default compose(
		withExams,
		withLoadingIndicator,
		injectIntl,
		withUpdateExamsInState,
		withSetPublished,
		withSetTags,
		withAvailableTags,
		withFilter,
		withTagsFilter,
)
