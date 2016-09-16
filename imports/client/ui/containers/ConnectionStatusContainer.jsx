import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import ConnectionStatus from '/imports/client/ui/components/ConnectionStatus';


let firstConnection = true;

export default createContainer(() => {
	const { connected, status, retryTime } = Meteor.status();
	
	if(firstConnection && status === 'connecting') {
		return {
			connected: true,
			retryingIn: 0,
			reconnect: Meteor.reconnect
		};
	} else {
		firstConnection = false;
		
		let retryingIn;
		
		if(retryTime) {
			retryingIn = Math.round((retryTime - (new Date()).getTime()) / 1000);
		}
		
		return {
			connected,
			retryingIn,
			reconnect: Meteor.reconnect
		};
	}
}, ConnectionStatus);
