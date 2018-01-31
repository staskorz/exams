import React from 'react'
import { Switch, Route, Redirect, matchPath } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import SubNav from '../../components/SubNav'
import SubNavLink from '../../components/SubNavLink'
import NotFound from '../NotFound'

import List from './List'
import Create from './Create'
import Edit from './Edit'
import Choice from './Choice'
import Results from './Results'
import ResultsByUser from './ResultsByUser'
import Take from './Take'
import Answers from './Answers'


const RedirectToList = ({ match }) => <Redirect to={ `${match.url}/list` } />


const locationHint = (base, path) => {
	const match = partialPath => matchPath(path, { path: base + partialPath })
	
	if(match('/results/:examId') || match('/results-by-user/:userId')) {
		return <FormattedMessage id='results' />
	} else if(match('/edit/:examId')) {
		return <FormattedMessage id='editing' />
	} else if(match('/take/:examId')) {
		return <FormattedMessage id='takeExam' />
	} else if(match('/answers/:answersId')) {
		return <FormattedMessage id='answers' />
	}
}


export default ({ match, location: { pathname } }) => <div>
	<SubNav locationHint={ locationHint(match.url, pathname) }>
		<SubNavLink to={ `${match.url}/list` } label={ <FormattedMessage id='list' /> } />
		<SubNavLink to={ `${match.url}/create` } label={ <FormattedMessage id='create' /> } />
		<SubNavLink to={ `${match.url}/choice` } label={ <FormattedMessage id='choice' /> } />
	</SubNav>
	
	<Switch>
		<Route exact path={ `${match.url}` } component={ RedirectToList } />
		
		<Route path={ `${match.url}/list` } component={ List } />
		<Route path={ `${match.url}/create` } component={ Create } />
		<Route path={ `${match.url}/choice` } component={ Choice } />
		
		<Route path={ `${match.url}/results/:examId` } component={ Results } />
		<Route path={ `${match.url}/results-by-user/:userId` } component={ ResultsByUser } />
		<Route path={ `${match.url}/edit/:examId` } component={ Edit } />
		<Route path={ `${match.url}/take/:examId` } component={ Take } />
		<Route path={ `${match.url}/answers/:answersId` } component={ Answers } />
		
		<Route component={ NotFound } />
	</Switch>
</div>
