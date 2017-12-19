import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { injectIntl } from 'react-intl'

import withLoadingIndicator from '../../../../../client/hocs/with-loading-indicator'

import withQuestionnaireAnswers from './with-questionnaire-answers'
import withFilter from './with-filter'


export default compose(
		withRouter,
		withQuestionnaireAnswers,
		withLoadingIndicator,
		injectIntl,
		withFilter,
)
