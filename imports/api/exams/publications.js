import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import getUserRole from '/imports/api/utils/get-user-role';
import collection from './collection';


Meteor.publish('exams', function() {
	if(getUserRole(this.userId) !== 'operator') {
		throw new Meteor.Error('exams.notOperator', 'Available only for operators.');
	}
	
	return collection.find({}, {
		fields: {
			_id: 1,
			name: 1,
			published: 1,
			createdAt: 1,
			updatedAt: 1,
			questions: 1
		},
		
		sort: { name: 1 }
	});
});


Meteor.publish('exams.published', function() {
	if(getUserRole(this.userId) !== 'operator') {
		throw new Meteor.Error('exams.published.notOperator', 'Available only for operators.');
	}
	
	return collection.find({
		published: true
	}, {
		fields: {
			_id: 1,
			name: 1
		},
		
		sort: {
			name: 1
		}
	});
});
