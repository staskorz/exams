import React from 'react';

import withCurrentUser from '/imports/client/ui/containers/withCurrentUser';
import LoadingIndicator from '/imports/client/ui/components/LoadingIndicator';


const EnsureLoginWrapper = ({ currentUser, children }) => {
	if(!currentUser || !currentUser.username || !currentUser.role) {
		return <LoadingIndicator />;
	}
	
	return <div>{ children }</div>;
};


export default withCurrentUser(EnsureLoginWrapper);
