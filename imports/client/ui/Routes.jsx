import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Layout from './layouts/Layout'
import Home from './pages/Home'
//import ExamCreate from './pages/ExamCreate'
//import QuestionnaireCreate from './pages/QuestionnaireCreate'
//import QuestionnaireEdit from './pages/QuestionnaireEdit'
//import QuestionnaireTake from './pages/QuestionnaireTake'
import QuestionnairesList from './pages/QuestionnairesList'
//import QuestionnaireAnswers from './pages/QuestionnaireAnswers'
//import ExamEdit from './pages/ExamEdit'
//import UsersList from './pages/UsersList'
//import UserResults from './pages/UserResults'
import ExamsList from './pages/ExamsList'
//import ExamChoiceContainer from './containers/ExamChoiceContainer'
import ExamResults from './pages/ExamResults'
//import ExamAnswers from './pages/ExamAnswers'
//import TakeExamContainer from './containers/TakeExamContainer'
import withCurrentUser from './hocs/with-current-user'
import NotFound from './pages/NotFound'


export default () => <Router history={ browserHistory }>
	<Route path='/' component={ withCurrentUser(Layout) }>
		<IndexRoute component={ withCurrentUser(Home) } />
		{ /*<Route path='create-exam' component={ ExamCreate } />*/ }
		{ /*<Route path='edit-exam/:examId' component={ ExamEdit } />*/ }
		<Route path='list-exams' component={ ExamsList } />
		{ /*<Route path='list-users' component={ UsersList } />*/ }
		{ /*<Route path='exam-choice' component={ ExamChoiceContainer } />*/ }
		<Route path='exam-results/:examId' component={ ExamResults } />
		{ /*<Route path='exam-answers/:answersId' component={ ExamAnswers } />*/ }
		{ /*<Route path='user-results/:userId' component={ UserResults } />*/ }
		{ /*<Route path='create-questionnaire' component={ QuestionnaireCreate } />*/ }
		{ /*<Route path='edit-questionnaire/:questionnaireId' component={ QuestionnaireEdit } />*/ }
		<Route path='list-questionnaires' component={ QuestionnairesList } />
		{ /*<Route path='questionnaire-answers/:questionnaireId' component={ QuestionnaireAnswers } />*/ }
		{ /*<Route path='take-exam/:examId' component={ TakeExamContainer } />*/ }
		{ /*<Route path='take-questionnaire/:questionnaireId' component={ QuestionnaireTake } />*/ }
		<Route path='*' component={ NotFound } />
	</Route>
</Router>
