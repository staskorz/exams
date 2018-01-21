import { compose, withProps } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'

import withLoadingIndicator from '../../../hocs/with-loading-indicator'
import transformExamServerToClient from '../../../util/transform-exam-server-to-client'
import withState from '../../../components/ExamEditForm/with-state/index'

import withExam from './with-exam'
import withUpdate from './with-update'

export default compose(
		withRouter,
		withExam,
		withLoadingIndicator,
		
		withProps(({ exam }) => ({
			exam: transformExamServerToClient(exam),
		})),
		
		injectIntl,
		withState,
		withUpdate,
)
