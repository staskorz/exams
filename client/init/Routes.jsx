import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Layout from '../layouts/Layout'
import Home from '../pages/Home'
import Exams from '../pages/Exams'
import Questionnaires from '../pages/Questionnaires'
import Users from '../pages/Users'
import NotFound from '../pages/NotFound'


const RedirectToTakeExam = ({ match: { params: { examId } } }) => <Redirect to={ `/exams/take/${examId}` } />
const RedirectToTakeQuestionnaire = ({ match: { params: { questionnaireId } } }) => <Redirect to={ `/questionnaires/take/${questionnaireId}` } />


export default () => <Router>
	<Layout>
		<Switch>
			<Route exact path='/' component={ Home } />
			<Route path='/exams' component={ Exams } />
			<Route path='/questionnaires' component={ Questionnaires } />
			<Route path='/users' component={ Users } />
			<Route path='/take-exam/:examId' component={ RedirectToTakeExam } />
			<Route path='/take-questionnaire/:questionnaireId' component={ RedirectToTakeQuestionnaire } />
			<Route component={ NotFound } />
		</Switch>
	</Layout>
</Router>
