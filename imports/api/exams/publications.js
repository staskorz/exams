import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import collection from './collection';


Meteor.publish('exams', () => collection.find(
		{}, {
			fields: {
				_id: 1,
				name: 1,
				questions: 1
			},
			
			sort: { name: 1 }
		})
);


Meteor.publish('exams.published', () => collection.find(
		{
			published: true
		}, {
			fields: {
				_id: 1,
				name: 1
			},
			
			sort: {
				name: 1
			}
		})
);
