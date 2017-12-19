import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'

import withLoadingIndicator from '../../hocs/with-loading-indicator'
import withQuestionnaire from '../../hocs/with-questionnaire'

import withInitialValue from './with-initial-value'
import withStateAndStateHandlers from './with-state-and-state-handlers'
import withSubmit from './with-submit'
import withSubmittedSuccessfullyIndicator from './with-submitted-successfully-indicator'
import withNotFoundNotification from './with-not-found-notification'


export default compose(
		withRouter,
		withQuestionnaire,
		withLoadingIndicator,
		withNotFoundNotification,
		withInitialValue,
		injectIntl,
		withStateAndStateHandlers,
		withSubmit,
		withSubmittedSuccessfullyIndicator,
)
