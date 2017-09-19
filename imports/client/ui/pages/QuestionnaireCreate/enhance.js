import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'

import withCancel from './with-cancel'
import withCreate from './with-create'
import withStateAndStateHandlers from './with-state-and-state-handlers'


export default compose(
		withRouter,
		withCancel,
		injectIntl,
		withStateAndStateHandlers,
		withCreate,
)
