import { Meteor } from 'meteor/meteor';


Meteor.users.deny({
	update: function() {
		return true;
	}
});


Meteor.publish('userData', function() {
	if(this.userId) {
		return Meteor.users.find({ _id: this.userId }, { fields: { 'role': 1 } });
	} else {
		this.ready();
	}
});
