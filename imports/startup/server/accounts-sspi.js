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
	if(!sspi) {
		return undefined;
	}
	
	const username = Meteor.call('getSspiUser');
	
	console.log('username:', username);
	
	const user = Meteor.users.findOne({ username });
	
	let userId;
	
	if(user) {
		userId = user._id;
	} else {
		userId = Meteor.users.insert({ username });
	}
	
	console.log('userId:', userId);
	
	return {
		userId
	};
});
