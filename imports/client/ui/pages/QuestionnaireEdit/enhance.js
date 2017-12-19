import { compose, renameProp } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'

import withCancel from '../../../../../client/components/QuestionnaireEditForm/with-cancel'
import withStateAndStateHandlers from '../../../../../client/components/QuestionnaireEditForm/with-state-and-state-handlers'
import withLoadingIndicator from '../../../../../client/hocs/with-loading-indicator'

import withQuestionnaire from '../../../../../client/hocs/with-questionnaire'
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
