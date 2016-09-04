import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './layouts/Layout';
import Home from './pages/Home';
import Page1 from './pages/Page1';
import ExamCreate from './pages/ExamCreate';
import ExamEdit from './pages/ExamEdit';
import ExamsListContainer from './containers/ExamsListContainer';
import ExamChoiceContainer from './containers/ExamChoiceContainer';
import TakeExam from './pages/TakeExam';
import NotFound from './pages/NotFound';


export default () => (
		<Router history={ browserHistory }>
			<Route path='/' component={ Layout }>
				<IndexRoute component={ Home } />
				<Route path='page1' component={ Page1 } />
				<Route path='create-exam' component={ ExamCreate } />
				<Route path='edit-exam/:examId' component={ ExamEdit } />
				<Route path='list-exams' component={ ExamsListContainer } />
				<Route path='exam-choice' component={ ExamChoiceContainer } />
				<Route path='take-exam/:examId' component={ TakeExam } />
				<Route path='*' component={ NotFound } />
			</Route>
		</Router>
);
