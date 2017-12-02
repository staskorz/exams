import { compose, withProps } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'

import withLoadingIndicator from '../../hocs/with-loading-indicator'

import withExam from './with-exam'
import withMissingIndicator from './with-missing-indicator'
import transformExamServerToClient from './transform-exam-server-to-client'
import withStartExamHandler from './with-start-exam-handler'
import withExamInfo from './with-exam-info'
import withQuestionNumberHandlers from './with-question-number-handler'
import withUpdate from './with-update'

export default compose(
		withRouter,
		withExam,
		withLoadingIndicator,
		withMissingIndicator,
		injectIntl,
		withProps(({ exam }) => ({
			exam: transformExamServerToClient(exam),
		})),
		withStartExamHandler,
		withExamInfo,
		withQuestionNumberHandlers,
		withUpdate,
)
