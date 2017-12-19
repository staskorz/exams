import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'

import withLoadingIndicator from '../../hocs/with-loading-indicator'

import withQuestionnaireAnswers from './with-questionnaire-answers'
import withFilter from './with-filter'


export default compose(
		withRouter,
		withQuestionnaireAnswers,
		withLoadingIndicator,
		injectIntl,
		withFilter,
)
