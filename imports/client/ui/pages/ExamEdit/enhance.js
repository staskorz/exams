import { compose, renameProp, withProps } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'

import withExam from '../../hocs/with-exam'
import withLoadingIndicator from '../../hocs/with-loading-indicator'

import withReduxForm from './with-redux-form'

export default compose(
		withRouter,
		withExam,
		withLoadingIndicator,
		injectIntl,
		renameProp('exam', 'initialValues'),
		withProps({ edit: true }),
		withReduxForm,
)
