import { compose, renameProp, withProps } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'

import withExam from '../../hocs/with-exam'
import withLoadingIndicator from '../../hocs/with-loading-indicator'

import withReduxForm from './with-redux-form'
import transformExamServerToClient from './transform-exam-server-to-client'

export default compose(
		withRouter,
		withExam,
		withLoadingIndicator,
		injectIntl,
		renameProp('exam', 'initialValues'),
		withProps(({ initialValues }) => ({
			edit: true,
			initialValues: transformExamServerToClient(initialValues),
		})),
		withReduxForm,
)
