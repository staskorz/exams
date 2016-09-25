import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { headers } from 'meteor/gadicohen:headers';
import ActiveDirectory from 'activedirectory';


const adConfig = Meteor.settings.private.activeDirectory;
const operatorsAdGroup = Meteor.settings.private.operatorsAdGroup;

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
	
	const rawUsername = Meteor.call('getSspiUser');
	
	if(!rawUsername) {
		return {
			type: 'sspi',
			error: new Meteor.Error('sspi-could-not-determine-user', 'Could not determine logged-in user')
		};
	}
	
	const username = rawUsername.toLowerCase();
	
	console.log('username:', username);
	
	const samAccountName = username.split('\\')[1];
	
	const isMember = Meteor.call('isUserMemberOf', {
		samAccountName,
		group: operatorsAdGroup
	});
	
	console.log('username:', username, 'isMember:', isMember);
	
	const role = isMember ? 'operator' : 'user';
	
	const user = Meteor.users.findOne({ username });
	
	let userId;
	
	if(user) {
		userId = user._id;
		
		if(role !== user.role) {
			Meteor.users.update({ _id: userId }, { $set: { role } });
		}
	} else {
		userId = Meteor.users.insert({ username, role });
	}
	
	console.log('userId:', userId);
	
	return {
		userId
	};
});
