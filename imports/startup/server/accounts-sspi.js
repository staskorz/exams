import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { headers } from 'meteor/gadicohen:headers';
import ActiveDirectory from 'activedirectory';


const adConfig = Meteor.settings.private.activeDirectory;

const activeDirectory = new ActiveDirectory(adConfig);


Meteor.methods({
	getSspiUser() {
		return headers.get(this, 'x-sspi-user');
	},
	
	isUserMemberOf({ samAccountName, group }) {
		let isUserMemberOfAsyncToSync = Meteor.wrapAsync(activeDirectory.isUserMemberOf, activeDirectory);
		
		return isUserMemberOfAsyncToSync(samAccountName, group);
	}
});


// Inspired by https://meteorhacks.com/extending-meteor-accounts/
Accounts.registerLoginHandler('sspi', ({ sspi }) => {
	if(!sspi) {
		return undefined;
	}
	
	const username = Meteor.call('getSspiUser').toLowerCase();
	
	console.log('username:', username);
	
	const samAccountName = username.split('\\')[1];
	
	const isMember = Meteor.call('isUserMemberOf', {
		samAccountName,
		group: 'ad-group-001'
	});
	
	console.log('username:', username, 'isMember:', isMember);
	
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
