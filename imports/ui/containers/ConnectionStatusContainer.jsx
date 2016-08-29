import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import ConnectionStatus from '/imports/ui/components/ConnectionStatus';


export default createContainer(() => {
	const { connected, retryTime } = Meteor.status();
	
	let retryingIn;
	
	if(retryTime) {
		retryingIn = Math.round((retryTime - (new Date()).getTime()) / 1000);
	}
	
	return {
		connected,
		retryingIn,
		reconnect: Meteor.reconnect
	};
}, ConnectionStatus);
