import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { injectIntl } from 'react-intl'

import withLoadingIndicator from '../../../../../client/hocs/with-loading-indicator'

import withExamAnswers from './with-exam-answers'


export default compose(
		withRouter,
		withExamAnswers,
		withLoadingIndicator,
		injectIntl,
)
