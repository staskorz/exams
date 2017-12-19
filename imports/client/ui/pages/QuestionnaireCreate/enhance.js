import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'

import withCancel from '../../../../../client/components/QuestionnaireEditForm/with-cancel'
import withStateAndStateHandlers from '../../../../../client/components/QuestionnaireEditForm/with-state-and-state-handlers'

import withCreate from './with-create'


export default compose(
		withRouter,
		withCancel,
		injectIntl,
		withStateAndStateHandlers,
		withCreate,
)
