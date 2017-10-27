import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import getUserRole from '/imports/api/utils/get-user-role'
import collection from './collection'


Meteor.publish('questionnaires', function() {
	if(getUserRole(this.userId) !== 'operator') {
		throw new Meteor.Error('questionnaires.notOperator', 'Available only for operators.')
	}
	
	return collection.find({}, {
		fields: {
			_id: 1,
			name: 1,
			published: 1,
			createdAt: 1,
			updatedAt: 1,
		},
		
		sort: { name: 1 },
	})
})


Meteor.publish('questionnaires.published', function() {
	if(getUserRole(this.userId) !== 'operator') {
		throw new Meteor.Error('questionnaires.published.notOperator', 'Available only for operators.')
	}
	
	return collection.find({
		published: true,
	}, {
		fields: {
			_id: 1,
			name: 1,
		},
		
		sort: {
			name: 1,
		},
	})
})
