import { Meteor } from 'meteor/meteor';

export default userId => {
	const user = Meteor.users.findOne({ _id: userId }, { fields: { username: 1, role: 1, englishName: 1, hebrewName: 1, employeeId: 1 } });
	
	return user;
};
