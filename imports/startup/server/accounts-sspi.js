import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { headers } from 'meteor/gadicohen:headers';
import ActiveDirectory from 'activedirectory';


Meteor.methods({
	getSspiUser() {
		return headers.get(this, 'x-sspi-user');
	}
});


const adConfig = Meteor.settings.private.activeDirectory;

const activeDirectory = new ActiveDirectory(adConfig);


// Inspired by https://meteorhacks.com/extending-meteor-accounts/
Accounts.registerLoginHandler('sspi', ({ sspi }) => {
	if(!sspi) {
		return undefined;
	}
	
	const username = Meteor.call('getSspiUser').toLowerCase();
	
	console.log('username:', username);
	
	const samAccountName = username.split('\\')[1];
	
	activeDirectory.isUserMemberOf(samAccountName, 'ad-group-001', (err, isMember) => {
		if(err) {
			console.log('Active Directory access error:', err);
		}
		
		console.log('username:', username, 'Member of group:', 'isMember:', isMember);
	});
	
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
