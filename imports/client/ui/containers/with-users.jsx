import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';


export default component => createContainer(() => {
	const allUsersHandle = Meteor.subscribe('users.all');
	
	if(allUsersHandle.ready()) {
		return {
			users: Meteor.users.find({}, { sort: { hebrewName: 1 } }).fetch(),
		}
	} else {
		return {
			loading: true,
		}
	}
}, component);
