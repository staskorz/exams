import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import collection from './collection';


Meteor.publish('exams', () => collection.find());


const examsPrivateFindOneSchema = new SimpleSchema({
	examId: {
		type: SimpleSchema.RegEx.Id
	}
});

Meteor.publish('exams.private.findOne', examId => {
	examsPrivateFindOneSchema.validate({ examId });
	
	return collection.find({ _id: examId });
});
