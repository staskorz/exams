import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import SubNav from '../../components/SubNav'
import SubNavLink from '../../components/SubNavLink'
import NotFound from '../NotFound'

import List from './List'


const RedirectToList = ({ match }) => <Redirect to={ `${match.url}/list` } />


export default ({ match }) => <div>
	<SubNav>
		<SubNavLink to={ `${match.url}/list` } label={ <FormattedMessage id='list' /> } />
	</SubNav>
	
	<Switch>
		<Route exact path={ `${match.url}` } component={ RedirectToList } />
		
		<Route path={ `${match.url}/list` } component={ List } />
		
		<Route component={ NotFound } />
	</Switch>
</div>
