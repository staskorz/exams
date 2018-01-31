import React from 'react'
import { Switch, Route, Redirect, matchPath } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import SubNav from '../../components/SubNav'
import SubNavLink from '../../components/SubNavLink'
import NotFound from '../NotFound'

import List from './List'
import Create from './Create'
import Edit from './Edit'
import Take from './Take'
import Answers from './Answers'


const RedirectToList = ({ match }) => <Redirect to={ `${match.url}/list` } />


const locationHint = (base, path) => {
	const match = partialPath => matchPath(path, { path: base + partialPath })
	
	if(match('/edit/:questionnaireId')) {
		return <FormattedMessage id='editing' />
	} else if(match('/take/:questionnaireId')) {
		return <FormattedMessage id='takeQuestionnaire' />
	} else if(match('/answers/:questionnaireId')) {
		return <FormattedMessage id='answers' />
	}
}


export default ({ match, location: { pathname } }) => <div>
	<SubNav locationHint={ locationHint(match.url, pathname) }>
		<SubNavLink to={ `${match.url}/list` } label={ <FormattedMessage id='list' /> } />
		<SubNavLink to={ `${match.url}/create` } label={ <FormattedMessage id='create' /> } />
	</SubNav>
	
	<Switch>
		<Route exact path={ `${match.url}` } component={ RedirectToList } />
		
		<Route path={ `${match.url}/list` } component={ List } />
		<Route path={ `${match.url}/create` } component={ Create } />
		
		<Route path={ `${match.url}/edit/:questionnaireId` } component={ Edit } />
		<Route path={ `${match.url}/take/:questionnaireId` } component={ Take } />
		<Route path={ `${match.url}/answers/:questionnaireId` } component={ Answers } />
		
		<Route component={ NotFound } />
	</Switch>
</div>
