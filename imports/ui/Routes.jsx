import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './layouts/Layout';
import Home from './pages/Home';
import Page1 from './pages/Page1';
import NotFound from './pages/NotFound';

export default () => (
	<Router history={ browserHistory }>
		<Route path='/' component={ Layout }>
			<IndexRoute component={ Home } />
			<Route path='/page1' component={ Page1 }/>
			<Route path='*' component={ NotFound }/>
		</Route>
	</Router>
);
