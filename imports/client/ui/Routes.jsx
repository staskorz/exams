import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Layout from '../../../client/layouts/Layout'
import Home from '../../../client/pages/Home'
import ExamCreate from '../../../client/pages/ExamCreate'
import QuestionnaireCreate from '../../../client/pages/QuestionnaireCreate'
import QuestionnaireEdit from '../../../client/pages/QuestionnaireEdit'
import QuestionnaireTake from '../../../client/pages/QuestionnaireTake/index'
import QuestionnairesList from '../../../client/pages/QuestionnairesList'
import QuestionnaireAnswers from '../../../client/pages/QuestionnaireAnswers'
import ExamEdit from '../../../client/pages/ExamEdit'
import UsersList from '../../../client/pages/UsersList'
import UserResults from '../../../client/pages/UserResults'
import ExamsList from '../../../client/pages/ExamsList'
import ExamChoice from '../../../client/pages/ExamChoice'
import ExamResults from '../../../client/pages/ExamResults'
import ExamAnswers from '../../../client/pages/ExamAnswers/index'
import ExamTake from '../../../client/pages/ExamTake'
import withCurrentUser from '../../../client/hocs/with-current-user'
import NotFound from '../../../client/pages/NotFound'


export default () => <Router history={ browserHistory }>
	<Route path='/' component={ withCurrentUser(Layout) }>
		<IndexRoute component={ withCurrentUser(Home) } />
		<Route path='create-exam' component={ ExamCreate } />
		<Route path='edit-exam/:examId' component={ ExamEdit } />
		<Route path='list-exams' component={ ExamsList } />
		<Route path='list-users' component={ UsersList } />
		<Route path='exam-choice' component={ ExamChoice } />
		<Route path='exam-results/:examId' component={ ExamResults } />
		<Route path='exam-answers/:answersId' component={ ExamAnswers } />
		<Route path='user-results/:userId' component={ UserResults } />
		<Route path='create-questionnaire' component={ QuestionnaireCreate } />
		<Route path='edit-questionnaire/:questionnaireId' component={ QuestionnaireEdit } />
		<Route path='list-questionnaires' component={ QuestionnairesList } />
		<Route path='questionnaire-answers/:questionnaireId' component={ QuestionnaireAnswers } />
		<Route path='take-exam/:examId' component={ ExamTake } />
		<Route path='take-questionnaire/:questionnaireId' component={ QuestionnaireTake } />
		<Route path='*' component={ NotFound } />
	</Route>
</Router>
