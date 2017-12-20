import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from '../layouts/Layout'
import Home from '../pages/Home'
import ExamCreate from '../pages/ExamCreate/index'
import QuestionnaireCreate from '../pages/QuestionnaireCreate/index'
import QuestionnaireEdit from '../pages/QuestionnaireEdit/index'
import QuestionnaireTake from '../pages/QuestionnaireTake/index'
import QuestionnairesList from '../pages/QuestionnairesList/index'
import QuestionnaireAnswers from '../pages/QuestionnaireAnswers/index'
import ExamEdit from '../pages/ExamEdit/index'
import UsersList from '../pages/UsersList/index'
import UserResults from '../pages/UserResults/index'
import ExamsList from '../pages/ExamsList/index'
import ExamChoice from '../pages/ExamChoice/index'
import ExamResults from '../pages/ExamResults/index'
import ExamAnswers from '../pages/ExamAnswers/index'
import ExamTake from '../pages/ExamTake/index'
import withCurrentUser from '../hocs/with-current-user'
import NotFound from '../pages/NotFound'


export default () => <Router>
	<Layout>
		<Switch>
			<Route exact path='/' component={ withCurrentUser(Home) } />
			<Route path='/create-exam' component={ ExamCreate } />
			<Route path='/edit-exam/:examId' component={ ExamEdit } />
			<Route path='/list-exams' component={ ExamsList } />
			<Route path='/list-users' component={ UsersList } />
			<Route path='/exam-choice' component={ ExamChoice } />
			<Route path='/exam-results/:examId' component={ ExamResults } />
			<Route path='/exam-answers/:answersId' component={ ExamAnswers } />
			<Route path='/user-results/:userId' component={ UserResults } />
			<Route path='/create-questionnaire' component={ QuestionnaireCreate } />
			<Route path='/edit-questionnaire/:questionnaireId' component={ QuestionnaireEdit } />
			<Route path='/list-questionnaires' component={ QuestionnairesList } />
			<Route path='/questionnaire-answers/:questionnaireId' component={ QuestionnaireAnswers } />
			<Route path='/take-exam/:examId' component={ ExamTake } />
			<Route path='/take-questionnaire/:questionnaireId' component={ QuestionnaireTake } />
			<Route component={ NotFound } />
		</Switch>
	</Layout>
</Router>
