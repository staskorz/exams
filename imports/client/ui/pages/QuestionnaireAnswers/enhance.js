import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { injectIntl } from 'react-intl'

import withQuestionnaireAnswers from './with-questionnaire-answers'
import withLoadingIndicator from '../../hocs/with-loading-indicator'


export default compose(
		withRouter,
		withQuestionnaireAnswers,
		withLoadingIndicator,
		injectIntl,
)
