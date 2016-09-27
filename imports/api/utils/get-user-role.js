import { Meteor } from 'meteor/meteor';

export default userId => {
	if(!userId) {
		return null;
	}
	
	const user = Meteor.users.findOne({ _id: userId }, { fields: { 'role': 1 } });
	
	if(user) {
		return user.role;
	} else {
		return null;
	}
};
