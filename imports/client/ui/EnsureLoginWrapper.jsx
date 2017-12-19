import React from 'react'

import withCurrentUser from '../../../client/hocs/with-current-user'
import UnknownUserNotification from '../../../client/components/UnknownUserNotification'


const EnsureLoginWrapper = ({ currentUser, children }) => {
	if(!currentUser || !currentUser.username || !currentUser.role) {
		return <UnknownUserNotification />
	}
	
	return <div>{ children }</div>
}


export default withCurrentUser(EnsureLoginWrapper)
