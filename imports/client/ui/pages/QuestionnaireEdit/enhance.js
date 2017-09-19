import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'

import withCancel from '../../components/QuestionnaireEditForm/with-cancel'
import withStateAndStateHandlers from '../../components/QuestionnaireEditForm/with-state-and-state-handlers'
import withLoadingIndicator from '../../hocs/with-loading-indicator'

import withQuestionnaire from '../../hocs/with-questionnaire'
import withUpdate from './with-update'


export default compose(
		withRouter,
		withQuestionnaire,
		withLoadingIndicator,
		withCancel,
		injectIntl,
		withStateAndStateHandlers,
		withUpdate,
)
