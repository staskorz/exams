import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import UsersTable from '/imports/client/ui/components/UsersTable';


const emptyUsersList = [];


export default createContainer(() => {
	const allUsersHandle = Meteor.subscribe('users.all');
	const ready = allUsersHandle.ready();
	const users = ready ? Meteor.users.find({}, { sort: { hebrewName: 1 } }).fetch() : emptyUsersList;
	
	return {
		ready,
		users
	};
}, UsersTable);
