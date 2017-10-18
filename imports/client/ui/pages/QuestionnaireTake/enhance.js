import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'

import withLoadingIndicator from '../../hocs/with-loading-indicator'
import withQuestionnaire from '../../hocs/with-questionnaire'

import withRenameQuestionnaireProp from './with-rename-questionnaire-prop'
import withInitialValue from './with-initial-value'
import withStateAndStateHandlers from './with-state-and-state-handlers'
import withSubmit from './with-submit'

export default compose(
		withRouter,
		withQuestionnaire,
		withLoadingIndicator,
		withRenameQuestionnaireProp,
		withInitialValue,
		injectIntl,
		withStateAndStateHandlers,
		withSubmit,
)
