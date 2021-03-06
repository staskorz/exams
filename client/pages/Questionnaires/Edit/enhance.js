import { compose, renameProp } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'

import withCancel from '../../../components/QuestionnaireEditForm/with-cancel'
import withStateAndStateHandlers from '../../../components/QuestionnaireEditForm/with-state-and-state-handlers'
import withLoadingIndicator from '../../../hocs/with-loading-indicator'

import withQuestionnaire from '../../../hocs/with-questionnaire'
import withUpdate from './with-update'


export default compose(
		withRouter,
		withQuestionnaire,
		withLoadingIndicator,
		renameProp('questionnaire', 'initialValue'),
		withCancel,
		injectIntl,
		withStateAndStateHandlers,
		withUpdate,
)
