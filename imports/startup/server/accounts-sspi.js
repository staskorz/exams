import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { headers } from 'meteor/gadicohen:headers';


Meteor.methods({
	getSspiUser() {
		return headers.get(this, 'x-sspi-user');
	}
});


// Inspired by https://meteorhacks.com/extending-meteor-accounts/
Accounts.registerLoginHandler('sspi', ({ sspi }) => {
	if(sspi) {
		console.log('sspi login request');
	} else {
		console.log('non-sspi login request');
		
		return undefined;
	}
	
	const sspiUser = Meteor.call('getSspiUser');
	
	console.log('sspiUser:', sspiUser);
	
	return null;
	
	const user = Meteor.users.findOne({ username: 'user001' });
	
	let userId;
	
	if(user) {
		userId = user._id;
	} else {
		userId = Meteor.users.insert({ username: 'user001' });
	}
	
	console.log('userId:', userId);
	
	return {
		userId
	};
});
