import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'

import withCancel from './Form/with-cancel'
import withCreate from './Form/with-create'
import withStateAndStateHandlers from './Form/with-state-and-state-handlers'


export default compose(
		withRouter,
		withCancel,
		injectIntl,
		withStateAndStateHandlers,
		withCreate,
)
