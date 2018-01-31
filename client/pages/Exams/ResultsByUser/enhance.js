import { compose, withState } from 'recompose'
import { withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'

import withLoadingIndicator from '../../../hocs/with-loading-indicator'
import withNoSuitableRecordsMessage from '../../../hocs/with-no-suitable-records-message'
import withYearSelection from '../../../hocs/with-year-selection'

import withExamAnswers from './with-exam-answers'
import withFilter from './with-filter'


export default compose(
		withRouter,
		withState('year', 'setYear', new Date().getFullYear()),
		withExamAnswers,
		withLoadingIndicator,
		injectIntl,
		withFilter,
		withYearSelection,
		withNoSuitableRecordsMessage('examResults'),
)
