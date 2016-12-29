import { Meteor } from 'meteor/meteor';


Meteor.users.deny({
	update: function() {
		return true;
	}
});


Meteor.publish('userData', function() {
	if(this.userId) {
		return Meteor.users.find({ _id: this.userId }, { fields: { role: 1, englishName: 1, hebrewName: 1, employeeId: 1 } });
	} else {
		this.ready();
	}
});


Meteor.publish('users.all', function() {
	if(this.userId) {
		const currentUser = Meteor.users.findOne({ _id: this.userId }, { fields: { role: 1 } });
		
		if(currentUser && currentUser.role === 'operator') {
			return Meteor.users.find({}, {
				fields: {
					role: 1,
					username: 1,
					hebrewName: 1,
					employeeId: 1
				}
			});
		} else {
			throw new Meteor.Error('users.all.notOperator', 'Available only for operators.');
		}
	} else {
		this.ready();
	}
});
