import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { headers } from 'meteor/gadicohen:headers';
import ActiveDirectory from 'activedirectory';


const settings = Meteor.settings.private;

const adConfig = settings.activeDirectory;
const operatorsAdGroup = settings.operatorsAdGroup;

const activeDirectory = new ActiveDirectory(adConfig);


Meteor.methods({
	getSspiUser() {
		return headers.get(this, 'x-sspi-user');
	},
	
	isUserMemberOf({ samAccountName, group }) {
		let isUserMemberOfAsyncToSync = Meteor.wrapAsync(activeDirectory.isUserMemberOf, activeDirectory);
		
		return isUserMemberOfAsyncToSync(samAccountName, group);
	},
	
	getUserProperties({ samAccountName }) {
		let findUserAsyncToSync = Meteor.wrapAsync(activeDirectory.findUser, activeDirectory);
		
		const opts = {
			attributes: ['displayName', 'description', 'postalCode']
		};
		
		return findUserAsyncToSync(opts, samAccountName);
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
	
	const samAccountName = username.split('\\')[1];
	
	const isMember = Meteor.call('isUserMemberOf', {
		samAccountName,
		group: operatorsAdGroup
	});
	
	const role = isMember ? 'operator' : 'user';
	
	const adUserProperties = Meteor.call('getUserProperties', { samAccountName });
	
	if(!adUserProperties) {
		return {
			type: 'sspi',
			error: new Meteor.Error('sspi-could-not-retrieve-user-properties', 'Could not retrieve logged-in user properties')
		};
	}
	
	const { displayName: englishName, description: hebrewName, postalCode: employeeId } = adUserProperties;
	
	const user = Meteor.users.findOne({ username }, { fields: { role: 1, englishName: 1, hebrewName: 1, employeeId: 1 } });
	
	let userId;
	
	if(user) {
		userId = user._id;
		
		if(role !== user.role ||
				((englishName || user.englishName) && (englishName !== user.englishName)) ||
				((hebrewName || user.hebrewName) && (hebrewName !== user.hebrewName)) ||
				((employeeId || user.employeeId) && (employeeId !== user.employeeId))) {
			Meteor.users.update({ _id: userId }, { $set: { role, englishName, hebrewName, employeeId } });
		}
	} else {
		userId = Meteor.users.insert({ username, role, englishName, hebrewName, employeeId });
	}
	
	return {
		userId
	};
});
