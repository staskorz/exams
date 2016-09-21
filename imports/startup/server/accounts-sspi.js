import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { headers } from 'meteor/gadicohen:headers';

// Inspired by https://meteorhacks.com/extending-meteor-accounts/
Accounts.registerLoginHandler('sspi', ({ sspi }) => {
	if(sspi) {
		console.log('sspi login request');
	} else {
		console.log('non-sspi login request');
		
		return undefined;
	}
	
	if(headers && headers.list) {
		const values = Object.values(headers.list);
		
		console.log('values:', values);
		
		if(values.length === 1) {
			if(values[0] && values[0]['x-sspi-user']) {
				console.log('x-sspi-user:', values[0]['x-sspi-user']);
			}
		} else {
			console.log('too many header objects');
		}
	}
	
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
