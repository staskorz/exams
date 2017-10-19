import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { injectIntl } from 'react-intl'

import withLoadingIndicator from '../../hocs/with-loading-indicator'

import withQuestionnaireAnswers from './with-questionnaire-answers'


export default compose(
		withRouter,
		withQuestionnaireAnswers,
		withLoadingIndicator,
		injectIntl,
)
