import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'

import withReduxForm from './with-redux-form'
import withCreate from './with-create'


export default compose(
		withRouter,
		injectIntl,
		withReduxForm,
		withCreate,
)
