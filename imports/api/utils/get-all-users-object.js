import { Meteor } from 'meteor/meteor';

export default () => {
	const users = Meteor.users.find({}, { fields: { 'username': 1 } });
	
	if(users) {
		const usersObj = {};
		
		users.forEach(({ _id, ...rest }) => {
			usersObj[_id] = rest;
		});
		
		return usersObj;
	} else {
		return {};
	}
};
