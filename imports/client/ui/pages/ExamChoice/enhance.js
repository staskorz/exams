import { compose } from 'recompose'
import { injectIntl } from 'react-intl'

import withLoadingIndicator from '../../../../../client/hocs/with-loading-indicator'

import withExams from './with-exams'
import withFilter from './with-filter'


export default compose(
		withExams,
		withLoadingIndicator,
		injectIntl,
		withFilter,
)
