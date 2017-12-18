import React from 'react'

import withCurrentUser from './hocs/with-current-user'
import UnknownUserNotification from './components/UnknownUserNotification'


const EnsureLoginWrapper = ({ currentUser, children }) => {
	if(!currentUser || !currentUser.username || !currentUser.role) {
		return <UnknownUserNotification />
	}
	
	return <div>{ children }</div>
}


export default withCurrentUser(EnsureLoginWrapper)
