import React from 'react'

import withCurrentUser from './hocs/with-current-user'
import LoadingIndicator from './components/LoadingIndicator'


const EnsureLoginWrapper = ({ currentUser, children }) => {
	console.log('currentUser:', currentUser)
	
	if(!currentUser || !currentUser.username || !currentUser.role) {
		return <LoadingIndicator />
	}
	
	return <div>{ children }</div>
}


export default withCurrentUser(EnsureLoginWrapper)
