import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './layouts/Layout';
import Home from './pages/Home';
import ExamCreate from './pages/ExamCreate';
import ExamEdit from './pages/ExamEdit';
import ExamsListContainer from './containers/ExamsListContainer';
import ExamChoiceContainer from './containers/ExamChoiceContainer';
import ExamResults from './pages/ExamResults';
import TakeExamContainer from './containers/TakeExamContainer';
import withCurrentUser from './containers/withCurrentUser';
import NotFound from './pages/NotFound';


export default () => (
		<Router history={ browserHistory }>
			<Route path='/' component={ withCurrentUser(Layout) }>
				<IndexRoute component={ Home } />
				<Route path='create-exam' component={ ExamCreate } />
				<Route path='edit-exam/:examId' component={ ExamEdit } />
				<Route path='list-exams' component={ ExamsListContainer } />
				<Route path='exam-choice' component={ ExamChoiceContainer } />
				<Route path='exam-results/:examId' component={ ExamResults } />
				<Route path='take-exam/:examId' component={ TakeExamContainer } />
				<Route path='*' component={ NotFound } />
			</Route>
		</Router>
);
