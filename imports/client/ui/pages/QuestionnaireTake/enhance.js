import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'

import withStateAndStateHandlers from '../../components/QuestionnaireEditForm/with-state-and-state-handlers'
import withLoadingIndicator from '../../hocs/with-loading-indicator'
import withQuestionnaire from '../../hocs/with-questionnaire'

import withRenameQuestionnaireProp from './with-rename-questionnaire-prop'


export default compose(
		withRouter,
		withQuestionnaire,
		withLoadingIndicator,
		withRenameQuestionnaireProp,
		injectIntl,
		withStateAndStateHandlers,
)
