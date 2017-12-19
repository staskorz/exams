import { compose, renameProp, withProps } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'

import withLoadingIndicator from '../../hocs/with-loading-indicator'
import transformExamServerToClient from '../../util/transform-exam-server-to-client'

import withExam from './with-exam'
import withReduxForm from './with-redux-form'
import withUpdate from './with-update'

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
		withUpdate,
		withReduxForm,
)
