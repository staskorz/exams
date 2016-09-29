import { Meteor } from 'meteor/meteor';

export default () => {
	const users = Meteor.users.find({}, { fields: { username: 1, englishName: 1, hebrewName: 1, employeeId: 1 } });
	
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
