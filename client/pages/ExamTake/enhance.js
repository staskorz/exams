import { compose, withProps } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'

import withLoadingIndicator from '../../hocs/with-loading-indicator'

import withExam from './with-exam'
import withMissingIndicator from './with-missing-indicator'
import transformExamServerToClient from '../../util/transform-exam-server-to-client'
import withStartExamHandler from './with-start-exam-handler'
import withExamInfo from './with-exam-info'
import withQuestionNumberHandlers from './with-question-number-handler'
import withAnswersSelection from './with-answers-selection'
import withSubmit from './with-submit'
import withSubmittingIndicator from './with-submitting-indicator'
import withExamMarkError from './with-exam-mark-error'
import withExamMark from './with-exam-mark'


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
		withAnswersSelection,
		withSubmit,
		withSubmittingIndicator,
		withExamMarkError,
		withExamMark,
)
