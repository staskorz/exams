import React from 'react'
import { withRouter } from 'react-router'

import withAnswers from '/imports/client/ui/containers/with-answers'
import ExamWithAnswers from '/imports/client/ui/components/exam-with-answers'


const Composed = withRouter(withAnswers(ExamWithAnswers))


export default () => <div>
	<Composed />
</div>
